import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ForgotPassword from "../controllers/ForgotPasswordControllers";
import ResetPasswordControllers from "../controllers/ResetPasswordControllers";

const PassRoutes = Router();
const forgotPassword = new ForgotPassword();
const resetPassword = new ResetPasswordControllers();


PassRoutes.post("/forgot",
celebrate({
  [Segments.BODY]:{
    email:Joi.string().email().required(),
  },
}),forgotPassword.create)

PassRoutes.post("/reset",
celebrate({
  [Segments.BODY]:{
    token:Joi.string().uuid().required(),
    password:Joi.string().required(),
    password_confirmation:Joi.string().required().valid(Joi.ref("password"))
  },
}),resetPassword.create)




export default PassRoutes
