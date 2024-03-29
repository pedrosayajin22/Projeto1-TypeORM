import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ProfileController from "../controllers/ProfileControllers";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
const ProfileRoutes = Router();
const profileController = new ProfileController()

ProfileRoutes.use(isAuthenticated)

ProfileRoutes.get("/", profileController.show);



ProfileRoutes.put(
  "/", celebrate({
    [Segments.BODY]:{
      name:Joi.string().required(),
      email:Joi.string().email().required(),
      old_password:Joi.string(),
      password:Joi.string().optional(),
      password_confirmation:Joi.string().valid(Joi.ref("password"))
      .when("password",{
        is:Joi.exist(),
        then:Joi.required()
      })
    }
  }), profileController.update,

);


export default ProfileRoutes
