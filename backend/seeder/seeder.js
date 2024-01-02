import mongoose from "mongoose"
import products from "./data.js"
import Product from "../models/product.js"




const seedProducts = async () => {


    try {

        await mongoose.connect(
            "mongodb+srv://binonguyen1090:123Huynguyen@bshopping.ay3s9g4.mongodb.net/bshopping?retryWrites=true&w=majority"
            )
        await Product.deleteMany()
        console.log('Products are deleted')

        await Product.insertMany(products)
        console.log('Products are added')

        process.exit()

    }catch(error){
        console.log(error.massage)
        process.exit()
    }
}

seedProducts()