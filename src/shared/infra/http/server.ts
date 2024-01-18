import 'reflect-metadata';
import 'es6-shim';
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import {errors} from "celebrate"
import "../typeorm"
import "@shared/container"
import 'express-async-errors';
import uploadConfig from '@config/upload';
import { pagination } from 'typeorm-pagination';
import "dotenv/config"
import RateLimiter from './middlewares/RateLimiter';

const app = express();



app.use(cors());

app.use(express.json());

app.use(RateLimiter)

app.use(pagination)

app.use("/files",express.static(uploadConfig.directory))

app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }
  return res.status(500).json({
    status:'error',
    message:'Internal Server Error'
  })
})

app.listen(3333, () => {
  console.log("Server Started on port '3333'");
});
