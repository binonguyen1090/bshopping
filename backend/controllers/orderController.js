

import Order from "../models/order.js"
import ErrorHandler from "../utils/errorHandler.js"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import APIFilters from "../utils/apiFilter.js"

export const newOrder = catchAsyncErrors(async (req,res) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo
    } = req.body
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
        user:req.user._id
    })

    res.status(200).json({
        order
    })
})



export const getOrderDetail = catchAsyncErrors(async (req,res,next) => {
    
    
    const order = await Order.findById(req?.params?.id)
    if(!order){
        return next(new ErrorHandler("Order not found", 404))
        // return  res.status(404).json({
        //     error: "Product not found",
        // })
    }
    res.status(200).json({
        order
    })
})

export const myOrder = catchAsyncErrors(async (req,res,next) => {
    
    console.log(req?.user?._id);
    const order = await Order.find({user: req?.user?._id})
    if(!order){
        return next(new ErrorHandler("Order not found", 404))
        // return  res.status(404).json({
        //     error: "Product not found",
        // })
    }
    res.status(200).json({
        order
    })
})

