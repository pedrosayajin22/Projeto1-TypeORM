import { Router } from "express";
import ProductsRoutes from "@modules/products/infra/http/routes/products.routes";
import UsersRoutes from "@modules/users/infra/http/routes/user.routes";
import SessionRoutes from "@modules/users/infra/http/routes/sessions.routes";
import PassRoutes from "@modules/users/infra/http/routes/password.routes";
import ProfileRoutes from "@modules/users/infra/http/routes/profile.routes";
import CustomerRoutes from "@modules/customers/infra/http/routes/customer.routes";
import OrderRoutes from "@modules/orders/infra/http/routes/order.routes";

const routes = Router();

routes.use("/products",ProductsRoutes);
routes.use("/users",UsersRoutes)
routes.use("/sessions",SessionRoutes)
routes.use("/password",PassRoutes)
routes.use("/profile",ProfileRoutes)
routes.use("/customers",CustomerRoutes)
routes.use("/order",OrderRoutes)




export default routes;
