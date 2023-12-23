import { Router } from "express";
import ProductsRoutes from "@modules/products/routes/products.routes";
import UsersRoutes from "@modules/users/routes/user.routes";
import SessionRoutes from "@modules/users/routes/sessions.routes";
import PassRoutes from "@modules/users/routes/password.routes";

const routes = Router();

routes.use("/products",ProductsRoutes);
routes.use("/users",UsersRoutes)
routes.use("/sessions",SessionRoutes)
routes.use("/password",PassRoutes)




export default routes;
