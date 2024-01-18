import { EntityRepository, Repository, getRepository } from "typeorm";
import UserToken from "../entities/UserToken";
import { IUserTokenRepository } from "@modules/users/domain/repositories/IUserTokenRepository";
import { IUserToken } from "@modules/users/domain/models/IUserToken";




export default class UserTokenRepository implements IUserTokenRepository{
  private ormRepository: Repository<UserToken>
   constructor(){
    this.ormRepository=getRepository(UserToken)
   }


  public async FindByToken(token:string):Promise<UserToken | undefined>{
    const userToken = await this.ormRepository.findOne({
      where:{
        token
      }
    })
    return userToken;

  }

  public async save(userToken:IUserToken):Promise<UserToken>{
    await this.ormRepository.save(userToken)
    return userToken
  }

  public async FindByID(id:string):Promise<UserToken | undefined>{
    const user = await this.ormRepository.findOne({
      where:{
        id
      }
    })
    return user;

  }
  public async generate(user_id:string):Promise<UserToken>{
    const userToken = await this.ormRepository.create({
        user_id
      })
      await this.save(userToken);

      return userToken;


  }
}
