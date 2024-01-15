import {Request,Response,NextFunction} from "express"
import { verify } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth";


interface ITokenPayLoad{
  iat:number,
  exp:number,
  sub:string
}

export default function isAuthenticated(
  req:Request,res:Response,next:NextFunction):void
  {
    const authHeader=req.headers.authorization;

    if(!authHeader){
      throw new AppError("Jwt Token is missing");
    }

    const [, token] = authHeader.split(" ");

    try {
      const decodeToken= verify(token,authConfig.jwt.secret)

      const {sub}= decodeToken as ITokenPayLoad;

      req.user={
        id:sub
      }



      return next()
    } catch (error) {
      throw new AppError("Invalid JWT Token")
    }

  }
