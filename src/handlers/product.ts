import { Request, Response } from "express"
import  { check, validationResult } from "express-validator"
import Product from "../models/Product.model"

export const createProduct = async (req: Request, res: Response) => {

    await check("name")
            .notEmpty().withMessage("El nombre del Producto no puede estar vacío").run(req);
    await check("price")
            .isNumeric().withMessage("El valor del precio debe ser un número")
            .notEmpty().withMessage("El precio del Producto no puede estar vacío")
            .custom((value)=>{return value > 0}).withMessage("El precio del Producto debe ser mayor a 0")
            .run(req)

    let errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    /* OPCION 1
    const product = new Product(req.body);
    const savedProduct = await product.save();
    */
   /* OPCION 2*/
   const product = await Product.create(req.body)
    res.json({
        data: product
    });
}