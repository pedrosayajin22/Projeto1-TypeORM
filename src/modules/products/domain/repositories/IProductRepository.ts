import { ICreateProduct } from "../models/ICreateProduct";
import { IFindProducts } from "../models/IFindProducts";
import { IProduct } from "../models/IProduct";

export interface IProductRepository {
  FindByName(name:string):Promise<IProduct | undefined>
  FindAllByIds(products:IFindProducts[]):Promise<IProduct[]>
  FindAll():Promise<IProduct[]>;
  FindById(id:string):Promise<IProduct | undefined>;
  save(product:IProduct):Promise<IProduct>
  remove(product:IProduct):Promise<void>
  create({name,price,quantity}:ICreateProduct):Promise<IProduct>
}
