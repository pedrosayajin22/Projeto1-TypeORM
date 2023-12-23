import { Router } from "express";
import ProductsController from "../controllers/ProductsController";
import { celebrate, Joi, Segments } from "celebrate";

const ProductsRoutes = Router();
const productsController = new ProductsController();

ProductsRoutes.get("/",productsController.index);

ProductsRoutes.get("/:id",
celebrate({
  [Segments.PARAMS]:{
    id:Joi.string().uuid().required()
  },

})
,productsController.show)

ProductsRoutes.post("/",
celebrate({
  [Segments.BODY]:{
    name:Joi.string().required(),
    price:Joi.number().precision(2).required(),
    quantity:Joi.number().required(),
  },
})
,productsController.create);

ProductsRoutes.put("/:id",
  celebrate({
    [Segments.PARAMS]:{
    id:Joi.string().uuid().required()
    },

    [Segments.BODY]:{

    name:Joi.string().required(),
    price:Joi.number().precision(2).required(),
    quantity:Joi.number().required(),

    },
  },)
,productsController.update)

ProductsRoutes.delete("/:id",
  celebrate({
    [Segments.PARAMS]:{
      id:Joi.string().uuid().required()
    },
  })
,productsController.delete)

export default ProductsRoutes;
