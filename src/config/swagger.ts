import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express";

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

export const swaggerUiOptions: SwaggerUiOptions = {
    customCss:
        `.topbar-wrapper .link {
            content: url("https://pnghq.com/wp-content/uploads/api-icon-png-2458-download-81347.png");
            height: 5rem;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #62b345;
        }
        `,
        customSiteTitle: "Documentación REST API Express / Typescript"
}
export default swaggeerSpec