

import Order from "../models/order.js"
import Product from "../models/product.js"
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
    console.log('order')
    console.log(order)

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
    
    const order = await Order.find({user: req?.user?._id})
    if(!order){
        return next(new ErrorHandler("Order not found", 404))
    }
    res.status(200).json({
        order
    })
})


export const getAllOrder = catchAsyncErrors(async (req,res,next) => {
    
    const orders = await Order.find()
    if(!orders){
        return next(new ErrorHandler("Orders not found", 404))

    }
    res.status(200).json({
        orders
    })
})

export const updateOrder = catchAsyncErrors(async (req,res,next) => {
    
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("Orders not found", 404))

    }


    if(order?.orderStatus === "Delivered"){
        return next(new ErrorHandler("Already delivered", 404))
    }

    //update product stock
    
    order.orderItems.forEach(async(item)=>{
        const product = await Product.findById(item.product.toString())
        
        if(!product){
            return next(new ErrorHandler("Product not found", 404))
        }
        product.stock = product.stock - item.quantity
        await product.save({validateBeforeSave: false})
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()
    await order.save()
    res.status(200).json({
        success: true
    })
})


export const deleteOrder = catchAsyncErrors(async (req,res) => {
    
    
    const order = await Order.findById(req?.params?.id)
    if(!order){
        return  res.status(404).json({
            error: "Order not found",
        })
    }

    await order.deleteOne()
    res.status(200).json({
        message: "Order is deleted",
    })
})


