import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";

export interface ICustomersRepository{
  FindAll():Promise<ICustomer[]>;
  FindByName(name:string):Promise<ICustomer | undefined>;
  FindById(id:string):Promise<ICustomer | undefined>;
  FindByEmail(email:string):Promise<ICustomer | undefined>;
  create(data:ICreateCustomer):Promise<ICustomer>;
  save(customer:ICustomer):Promise<ICustomer>;
  remove(customer:ICustomer):Promise<void>;

}


