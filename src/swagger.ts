import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Authentication API",
      version: "1.0.0",
      description: "JWT Swagger Nodejs API",
    },
    tags: [
      {
        name: "message",
        description: "Endpoints for managing messages",
      },
      {
        name: "authentication",
        description: "Endpoints for user authentication",
      },
    ],
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/controllers/*.ts",],
  
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app: express.Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
};

export default setupSwagger;
