import { Router } from "express";
import ProductsRoutes from "@modules/products/routes/products.routes";
import UsersRoutes from "@modules/users/routes/user.routes";
import SessionRoutes from "@modules/users/routes/sessions.routes";
import PassRoutes from "@modules/users/routes/password.routes";
import ProfileRoutes from "@modules/users/routes/profile.routes";
import CustomerRoutes from "@modules/customers/routes/customer.routes";

const routes = Router();

routes.use("/products",ProductsRoutes);
routes.use("/users",UsersRoutes)
routes.use("/sessions",SessionRoutes)
routes.use("/password",PassRoutes)
routes.use("/profile",ProfileRoutes)
routes.use("/customers",CustomerRoutes)




export default routes;
