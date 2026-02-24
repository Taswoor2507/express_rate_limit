import AsyncHanlder from "../handlers/AsyncHandler.js"
import { Product } from "../models/product.model.js"
import { ApiFeatures } from "../utils/ApiFeatures.js"
const getAllProducts = AsyncHanlder(async (req, res, next) => {
    const queryStr = req.query;
    const allowedFields =  ["price", "category" , "rating"];
    console.log(queryStr , "QQQQQQQQQQQQQQQ")
    const productQueryObj = new ApiFeatures(Product.find(), queryStr , allowedFields)
    .filter()
    .search()
    .sort()
    .paginate()
    const product = await productQueryObj.query;
    
   
    res.status(200).json({
        total: product.length,
        success: true,
        product
    });
});
export {getAllProducts}



//  p1  = 20 , 2
//  p2  = 18 ,  3
//sort price, raitng =>  p2,p1 =>   p1,p2 