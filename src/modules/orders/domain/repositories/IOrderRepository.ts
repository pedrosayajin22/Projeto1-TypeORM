import { ICreateOrder } from "../models/ICreateOrder";
import { IOrder } from "../models/IOrder";

export interface IOrderRepository{
  FindById(id:string):Promise<IOrder | undefined>
  CreateOrder({customer,products}:ICreateOrder):Promise<IOrder>
  save(order:IOrder):Promise<IOrder>

}
