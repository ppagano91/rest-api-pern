import swaggerJSDoc from "swagger-jsdoc"

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            {
                name: "Products",
                description: "API operations related to products"
            }
        ],
        info: {
            title: "Rest API Node.js / Express / Typescript",
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: [
        "./src/router.ts"
    ]
}

const swaggeerSpec = swaggerJSDoc(options);
export default swaggeerSpec