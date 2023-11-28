import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import  jwt  from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticatedUser = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("Need to log in ", 401))
    }
    const decoded = jwt .verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})