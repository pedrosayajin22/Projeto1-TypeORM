import { ICreateUserServices } from "../models/ICreateUserServices";
import { IUser } from "../models/IUser";

export interface IUserRepository{
  FindByName(name:string):Promise<IUser | undefined>
  FindByID(id:string):Promise<IUser | undefined>
  FindByEmail(email:string):Promise<IUser | undefined>
  FindAll():Promise<IUser[]>
  save(user:IUser):Promise<IUser>
  create({name,email,password}:ICreateUserServices):Promise<IUser>

}
