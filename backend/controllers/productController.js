

import Product from "../models/product.js"
import ErrorHandler from "../utils/errorHandler.js"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import APIFilters from "../utils/apiFilter.js"

export const getProducts = catchAsyncErrors(async (req,res) => {



    const apiFilter = new APIFilters(Product,req.query).search()

    let products = await apiFilter.query
    let productsLength = products.length
    // const products = await Product.find()


    res.status(200).json({
        productsLength,
        products,
    })
})


export const newProduct = catchAsyncErrors(async (req,res) => {
    
    
    const product = await Product.create(req.body)

    res.status(200).json({
        product
    })
})


export const getProductDetail = catchAsyncErrors(async (req,res,next) => {
    
    
    const product = await Product.findById(req?.params?.id)
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
        // return  res.status(404).json({
        //     error: "Product not found",
        // })
    }
    res.status(200).json({
        product
    })
})

export const updateProduct = catchAsyncErrors(async (req,res) => {
    
    
    const product = await Product.findById(req?.params?.id)
    if(!product){
        return  res.status(404).json({
            error: "Product not found",
        })
    }

    const newproduct = await Product.findByIdAndUpdate(req?.params?.id, req.body, {new: true})
    res.status(200).json({
        newproduct
    })
})

export const deleteProduct = catchAsyncErrors(async (req,res) => {
    
    
    const product = await Product.findById(req?.params?.id)
    if(!product){
        return  res.status(404).json({
            error: "Product not found",
        })
    }

    await product.deleteOne()
    res.status(200).json({
        message: "Product is deleted",
    })
})







