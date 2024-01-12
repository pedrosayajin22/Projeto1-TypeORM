import { Router } from "express";
import OrderController from "../controllers/OrderControllers";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const OrderRoutes = Router();
const orderController = new OrderController();

OrderRoutes.use(isAuthenticated)


OrderRoutes.get("/:id",
celebrate({
  [Segments.PARAMS]:{
    id:Joi.string().uuid().required()
  },

})
,orderController.show)

OrderRoutes.post("/",
celebrate({
  [Segments.BODY]:{
    customer_id:Joi.string().required(),
    products:Joi.required(),
  },
})
,orderController.create);



export default OrderRoutes;
