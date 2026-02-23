import AsyncHanlder from "../handlers/AsyncHandler.js"
import { Product } from "../models/product.model.js"
import { ApiFeatures } from "../utils/ApiFeatures.js"
const getAllProducts = AsyncHanlder(async (req, res, next) => {
    const queryStr = req.query;
    const allowedFields =  ["price", "category"];
    console.log(queryStr , "QQQQQQQQQQQQQQQ")
    const productQueryObj = new ApiFeatures(Product.find(), queryStr , allowedFields);
    const product = await productQueryObj.filter().paginate().query;
    // const products =  await Product.find({price:{$lte:32}});
    
    res.status(200).json({
        total: product.length,
        success: true,
        product
    });
});
export {getAllProducts}