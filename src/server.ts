import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "./swagger.json";

import { router } from "./routes";
import { createConnection } from "./database/data-source";

createConnection();

import "./shared/container";
import "./shared/container/providers";
import { AppError } from "./shared/errors/AppError";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error: ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server started on port 3333"));
