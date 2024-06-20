import { Router } from "express";
import { createProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware";

const router = Router();

router.get("/", getProducts)
router.get("/:id",
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getProductById
)

router.post("/",
    body("name")
            .notEmpty().withMessage("El nombre del Producto no puede estar vacío"),
    body("price")
            .isNumeric().withMessage("El valor del precio debe ser un número")
            .notEmpty().withMessage("El precio del Producto no puede estar vacío")
            .custom((value)=>{return value > 0}).withMessage("El precio del Producto debe ser mayor a 0"),
    handleInputErrors,
    createProduct)

// PUT: Realiza actualizaciones completas
router.put("/:id",
    body("name")
            .notEmpty().withMessage("El nombre del Producto no puede estar vacío"),
    body("price")
            .isNumeric().withMessage("El valor del precio debe ser un número")
            .notEmpty().withMessage("El precio del Producto no puede estar vacío")
            .custom((value)=>{return value > 0}).withMessage("El precio del Producto debe ser mayor a 0"),
    body("availability")
        .isBoolean().withMessage("Valor de \"disponibilidad\" no válido"),
    handleInputErrors,
    updateProduct
)

// PATCH: Realiza actualizaciones parciales
router.patch("/:id",
    handleInputErrors,
    updateAvailability
)

router.delete("/", (req, res) =>{
    res.json("DELETE")
})

export default router;