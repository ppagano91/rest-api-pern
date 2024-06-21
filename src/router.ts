import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          Prodcut:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo Samsung
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 500
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

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
    param("id").isInt().withMessage("ID no válido"),
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
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    updateAvailability
)

router.delete("/:id",
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    deleteProduct
)

export default router;