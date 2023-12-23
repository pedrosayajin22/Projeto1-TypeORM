import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ForgotPassword from "../controllers/ForgotPassword";

const PassRoutes = Router();
const forgotPassword = new ForgotPassword();


PassRoutes.post("/forgot",
celebrate({
  [Segments.BODY]:{
    email:Joi.string().email().required(),
  },
}),forgotPassword.create)

export default PassRoutes
