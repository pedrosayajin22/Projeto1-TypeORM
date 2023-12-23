import { EntityRepository, Repository } from "typeorm";
import Users from "../entities/Users";

@EntityRepository(Users)
export default class UserRepository extends Repository<Users>{
  public async FindByName(name:string):Promise<Users | undefined>{
    const user = await this.findOne({
      where:{
        name
      }
    })
    return user;

  }
  public async FindByID(id:string):Promise<Users | undefined>{
    const user = await this.findOne({
      where:{
        id
      }
    })
    return user;

  }
  public async FindByEmail(email:string):Promise<Users | undefined>{
    const user = await this.findOne({
      where:{
        email
      }
    })
    return user;

  }
}
