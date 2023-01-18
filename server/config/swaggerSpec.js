import swaggerJSDoc from 'swagger-jsdoc';
import * as dotenv from "dotenv";

dotenv.config()

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Blog',
        version: '1.0.0',
        description: "This is a REST API application made with Express."
    },
    servers:[
        {
            url: `https://localhost:${process.env.PORT || 3000}`,
            description: 'Development server'
        }
    ]
};

const options = {
    swaggerDefinition,

    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export {swaggerSpec}