import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
   name:String,
   price:Number,
   category:String,
} , {timestamps: true});

const Product = mongoose.model("Product" , productSchema);
export {Product};