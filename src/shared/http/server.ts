import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from "../errors/AppError"
import {errors} from "celebrate"
import '../typeorm';
import 'express-async-errors';
import uploadConfig from '@config/upload';


const app = express();



app.use(cors());
app.use(express.json());
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
