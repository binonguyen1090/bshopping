

import Product from "../models/product.js"
import ErrorHandler from "../utils/errorHandler.js"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import APIFilters from "../utils/apiFilter.js"
import order from "../models/order.js"
import { upload_file } from "../utils/cloudinary.js"
import { delete_file } from "../utils/cloudinary.js"
export const getProducts = catchAsyncErrors(async (req,res) => {

    const resPerPage = 4;

    const apiFilter = new APIFilters(Product,req.query).search().filters()

    let products = await apiFilter.query
    let productsLength = products.length
    // const products = await Product.find()

    apiFilter.pagination(resPerPage)
    products = await apiFilter.query.clone()

    res.status(200).json({
        resPerPage,
        productsLength,
        products,
    })
})


export const newProduct = catchAsyncErrors(async (req,res) => {
    
    req.body.user = req.user._id
    const product = await Product.create(req.body)

    res.status(200).json({
        product
    })
})

// Get products - ADMIN   =>  /api/v1/admin/products
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      products,
    });
  });

  
export const getProductDetail = catchAsyncErrors(async (req,res,next) => {
    
    const product = await Product.findById(req?.params?.id).populate('reviews.user')
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

        // Deleting image associated with product
    for (let i = 0; i < product?.images?.length; i++) {
        await delete_file(product?.images[i].public_id);
    }

    await product.deleteOne()
    res.status(200).json({
        message: "Product is deleted",
    })
})

export const createProductReview = catchAsyncErrors(async (req,res) => {
    
    const {rating, comment, productId } = req.body
    const review = {
        user: req.user.id,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId)
    if(!product){
        return  res.status(404).json({
            error: "Product not found",
        })
    }

    const isReviewed = product.reviews.find((r) => r.user.toString() == req.user.id.toString())
    if(isReviewed){
        product.reviews.forEach(r=>{
            if(r.user.toString() == req.user.id.toString()){
                r.comment = comment
                r.rating = rating
            }
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }


    product.ratings = product.reviews.reduce((acc,item)=>
        item.rating + acc ,0
    ) / product.reviews.length

    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success: true,
    })
})



export const getAllReviews = catchAsyncErrors(async (req,res,next) => {

    console.log(req.query)
    const product = await Product.findById(req?.query?.id).populate("reviews.user")
    if(!product){
        return  res.status(404).json({
            error: "Product not found",
        })
    }

    res.status(200).json({
        reviews: product.reviews
    })
})

export const deleteProductReview = catchAsyncErrors(async (req,res) => {
    


    let product = await Product.findById(req.query.productId)
    if(!product){
        return  res.status(404).json({
            error: "Product not found",
        })
    }

    const reviews = product.reviews.filter((r) => r.id.toString() != req.query.id.toString())

    const numOfReviews = reviews.length

    const ratings = numOfReviews == 0? 0 :product.reviews.reduce((acc,item)=>
        item.rating + acc ,0
    ) / numOfReviews

    product = await Product.findByIdAndUpdate(req.query.productId, {reviews, numOfReviews, ratings}, {new:true})

    res.status(200).json({
        success: true,
        product
    })
})



export const canUserReview = catchAsyncErrors(async (req, res) => {
    const orders = await order.find({
      user: req.user._id,
      "orderItems.product": req.query.productId,
    });
  
    if (orders.length === 0) {
      return res.status(200).json({ canReview: false });
    }
  
    res.status(200).json({
      canReview: true,
    });
  });


  // Upload product images   =>  /api/v1/admin/products/:id/upload_images
export const uploadProductImages = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req?.params?.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const uploader = async (image) => upload_file(image, "bshopping/products");
  
    const urls = await Promise.all((req?.body?.images).map(uploader)); 
  
    product?.images?.push(...urls);
    await product?.save();
  
    res.status(200).json({
      product,
    });
  });



// Delete product image   =>  /api/v1/admin/products/:id/delete_image
export const deleteProductImage = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req?.params?.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const isDeleted = await delete_file(req.body.imgId);
  
    if (isDeleted) {
      product.images = product?.images?.filter(
        (img) => img.public_id !== req.body.imgId
      );
  
      await product?.save();
    }
  
    res.status(200).json({
      product,
    });
  });


