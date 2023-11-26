import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import User from "../models/user.js"
import ErrorHandler from "../utils/errorHandler.js"


export const registerUser = catchAsyncErrors(async (req,res,next) => {
    
    const {name, email, password} = req.body
    
    const user = await User.create({name, email, password})

    const token = user.getJwtToken()


    res.status(201).json({
        success: true,
        token
    })
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

    const token = user.getJwtToken()

    res.status(200).json({
        success: true,
        token
    })
})
