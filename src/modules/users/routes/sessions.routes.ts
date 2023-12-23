import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionsControllers from "../controllers/SessionsControllers";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const SessionRoutes = Router();
const sessionRoutes = new SessionsControllers();


SessionRoutes.post("/",
celebrate({
  [Segments.BODY]:{
    email:Joi.string().email().required(),
    password:Joi.string().required(),

  },
}),sessionRoutes.create)

export default SessionRoutes
