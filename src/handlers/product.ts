import { Request, Response } from "express"
import  { check, validationResult } from "express-validator"
import Product from "../models/Product.model"

export const createProduct = async (req: Request, res: Response) => {

    try {
        /* OPCION 1
        const product = new Product(req.body);
        const savedProduct = await product.save();
        */
       /* OPCION 2*/
       const product = await Product.create(req.body)
       res.json({
           data: product
        });
    } catch (error) {
        console.log(error)
    }
}