import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import User from "../models/user.js"
import ErrorHandler from "../utils/errorHandler.js"
import sendToken from "../utils/sendToken.js"
import sendEmail from "../utils/sendEmail.js"
import { getResetPasswordTemplate } from "../utils/emailTemplates.js"
import crypto from "crypto"


export const registerUser = catchAsyncErrors(async (req,res,next) => {
    
    const {name, email, password} = req.body
    
    const user = await User.create({name, email, password})

    sendToken(user, 201,res)
})


export const loginUser = catchAsyncErrors(async (req,res,next) => {
    
    const {email, password} = req.body
    
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    const user = await User.findOne({email}).select("+password")
 
    if(!user){
        return next(new ErrorHandler('Invalid email || password', 401))
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler('Invalid email || password', 401))
    }

    sendToken(user, 201,res)
})


export const logoutUser = catchAsyncErrors(async (req,res,next) => {
    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        message: 'Logout'
    })
})

export const forgotPassword = catchAsyncErrors(async (req,res,next) => {
    

    const user = await User.findOne({email: req.body.email})
 
    if(!user){
        return next(new ErrorHandler('User not found', 401))
    }

    const resetToken = await user.getResetPasswordToken();
    await user.save()



    // Create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Bshopping Password Recovery",
      message,
    });

    res.status(200).json({
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }
})


export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash the URL Token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHandler(
          "Password reset token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Passwords does not match", 400));
    }
  
    // Set the new password
    user.password = req.body.password;
  
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
    console.log(user)
    console.log(res)
    sendToken(user, 200, res);
  });



export const getUserProfile = catchAsyncErrors(async(req,res,next) =>{
    const user = await User.findById(req?.user?._id)
    res.status(200).json({
        user
      });
})

export const updatePassword = catchAsyncErrors(async(req,res,next) =>{
    const user = await User.findById(req?.user?._id).select('+password')


    const isPasswordMatch = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatch) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }
    user.password = req.body.password
    user.save()

    res.status(200).json({
        success: true
      });
})

export const updateProfile = catchAsyncErrors(async(req,res,next) =>{
    


    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {new:true})

    res.status(200).json({
        user
      });
})