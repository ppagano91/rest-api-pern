import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
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


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of Products
 *          tags:
 *              - Products
 *          description: Return a list of Products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts)


/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Sueccessful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bas Request - Invalid ID
*/
router.get("/:id",
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getProductById
)


/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new Product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo Samsung"
 *                              price:
 *                                  type: number
 *                                  example: 499
 *          responses:
 *              201:
 *                  description: Product created successfully
 *              400:
 *                  description: Bad Request - Invalid input data
 */
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