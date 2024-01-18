import { container } from "tsyringe";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { CustomerRepository } from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import { IOrderRepository } from "@modules/orders/domain/repositories/IOrderRepository";
import { OrderRepository } from "@modules/orders/infra/typeorm/repositories/OrderRepository";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import UserRepository from "@modules/users/infra/typeorm/repositories/UsersRepositories";
import { IUserTokenRepository } from "@modules/users/domain/repositories/IUserTokenRepository";
import UserTokenRepository from "@modules/users/infra/typeorm/repositories/UserTokenRepositories";


container.registerSingleton<ICustomersRepository>(
  'CustomerRepository', CustomerRepository
  )
container.registerSingleton<IOrderRepository>(
  'OrderRepository', OrderRepository
  )
container.registerSingleton<IProductRepository>(
  'ProductRepository', ProductRepository
  )
container.registerSingleton<IUserRepository>(
  'UserRepository', UserRepository
  )
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository', UserTokenRepository
  )

