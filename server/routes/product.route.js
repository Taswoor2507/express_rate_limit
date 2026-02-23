import {Router} from "express";
const productRouter = Router();
import { getAllProducts } from "../controllers/products.controller.js";

productRouter.get("/" , getAllProducts);

export {productRouter};