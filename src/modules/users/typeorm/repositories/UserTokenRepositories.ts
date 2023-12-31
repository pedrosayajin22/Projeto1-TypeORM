import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
export default class UserTokenRepository extends Repository<UserToken>{
  public async FindByToken(token:string):Promise<UserToken | undefined>{
    const userToken = await this.findOne({
      where:{
        token
      }
    })
    return userToken;

  }
  public async FindByID(id:string):Promise<UserToken | undefined>{
    const user = await this.findOne({
      where:{
        id
      }
    })
    return user;

  }
  public async generate(user_id:string):Promise<UserToken>{
    const userToken = await this.create({
        user_id
      })
      await this.save(userToken);

      return userToken;


  }
}
