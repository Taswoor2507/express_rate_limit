import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
   name:String,
   price:Number,
   category:String,
   description:String,
   rating:Number,
   title:String
} , {timestamps: true});

// indexing 

productSchema.index({price :1 })
productSchema.index({rating:1})
productSchema.index({category:1, price:1})
productSchema.index({category:1 , rating:1})


// text

productSchema.index({title:"text" , category:"text" , name:"text"})

const Product = mongoose.model("Product" , productSchema);
export {Product};