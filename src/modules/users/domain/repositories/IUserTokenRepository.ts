import { IUserToken } from "../models/IUserToken";

export interface IUserTokenRepository{
  FindByToken(token:string):Promise<IUserToken | undefined>
  FindByID(id:string):Promise<IUserToken | undefined>
  generate(user_id:string):Promise<IUserToken>
  save(userToken:IUserToken):Promise<IUserToken>
}
