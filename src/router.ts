import { Router } from "express";
import { createProduct } from "./handlers/product";
import { body } from "express-validator"
import { handleInputErrors } from "./middleware";

const router = Router();

router.get("/", (req, res) =>{
    res.json("GET")
})

router.post("/",
    body("name")
            .notEmpty().withMessage("El nombre del Producto no puede estar vacío"),
    body("price")
            .isNumeric().withMessage("El valor del precio debe ser un número")
            .notEmpty().withMessage("El precio del Producto no puede estar vacío")
            .custom((value)=>{return value > 0}).withMessage("El precio del Producto debe ser mayor a 0"),
    handleInputErrors,
    createProduct)

router.put("/", (req, res) =>{
    res.json("PUT")
})

router.delete("/", (req, res) =>{
    res.json("DELETE")
})

export default router;