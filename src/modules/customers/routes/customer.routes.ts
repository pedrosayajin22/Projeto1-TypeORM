import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import CustomersControllers from "../controllers/CustomersControllers";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const CustomerRoutes = Router();
const customerController = new CustomersControllers();
CustomerRoutes.use(isAuthenticated)


CustomerRoutes.get("/",customerController.index);

CustomerRoutes.get("/:id",
celebrate({
  [Segments.PARAMS]:{
    id:Joi.string().uuid().required()
  },

})
,customerController.show)

CustomerRoutes.post("/",
celebrate({
  [Segments.BODY]:{
    name:Joi.string().required(),
    email:Joi.string().email().required(),
  },
})
,customerController.create);

CustomerRoutes.put("/:id",
  celebrate({
    [Segments.PARAMS]:{
    id:Joi.string().uuid().required()
    },

    [Segments.BODY]:{

    name:Joi.string().required(),
    email:Joi.string().email().required(),

    },
  },)
,customerController.update)

CustomerRoutes.delete("/:id",
  celebrate({
    [Segments.PARAMS]:{
      id:Joi.string().uuid().required()
    },
  })
,customerController.delete)

export default CustomerRoutes;
