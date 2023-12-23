import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import uploadConfig from "@config/upload"
import UsersController from "../controllers/UserControllers";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UsersAvatarController from "../controllers/UserAvatarControllers";

const UserRoutes = Router();
const userRoutes = new UsersController();
const userAvatarC= new UsersAvatarController();
const upload= multer(uploadConfig)

UserRoutes.get("/",isAuthenticated, userRoutes.index);

UserRoutes.post("/",
celebrate({
  [Segments.BODY]:{
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),

  },
}),userRoutes.create)

UserRoutes.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  userAvatarC.update,

);


export default UserRoutes
