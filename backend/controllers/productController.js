

import Product from "../models/product.js"

export const getProducts = async (req,res) => {

    const products = await Product.find()
    res.status(200).json({
        products,
    })
}


export const newProduct = async (req,res) => {
    
    
    const product = await Product.create(req.body)

    res.status(200).json({
        product
    })
}


export const getProductDetail = async (req,res) => {
    
    
    const product = await Product.findById(req?.params?.id)
    if(!product){
        return  res.status(404).json({
            error: "Product not found",
        })
    }
    res.status(200).json({
        product
    })
}








