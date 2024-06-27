import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll(
            {attributes: {exclude: ["createdAt", "updatedAt"]}}
        );
        res.json({data: products})
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({
                "error": true,
                "msg": `No existe Producto con ID = ${id}`
            })
        }
        res.json({data: product})
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req: Request, res: Response) => {

    try {
        /* OPCION 1
        const product = new Product(req.body);
        const savedProduct = await product.save();
        */
       /* OPCION 2*/
       const product = await Product.create(req.body)
       res.status(201).json({
           data: product
        });
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req: Request, res: Response) =>{
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({
                "error": true,
                "msg": `No existe Producto con ID = ${id}`
            })
        }

        await product.update(req.body);
        await product.save();

        res.json({data: product, msg: "Prodcuto actualizado"})
    } catch (error) {
        console.log(error)
    }
}

export const updateAvailability = async (req: Request, res: Response) =>{
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({
                "error": true,
                "msg": `No existe Producto con ID = ${id}`
            })
        }
        product.availability = !product.dataValues.availability;
        await product.save();

        res.json({data: product, msg: "Disponibilidad actualizada"})
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (req, res) =>{
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({
                "error": true,
                "msg": `No existe Producto con ID = ${id}`
            })
        }

        await product.destroy()

        res.json({data: null, msg:"Producto eliminado"})
    } catch (error) {
        console.log(error)
    }
}