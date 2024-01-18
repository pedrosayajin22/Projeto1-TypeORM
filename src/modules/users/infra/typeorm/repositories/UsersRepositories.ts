import { EntityRepository, Repository, getRepository } from "typeorm";
import Users from "../entities/Users";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { ICreateUserServices } from "@modules/users/domain/models/ICreateUserServices";
import { hash } from "bcrypt";

export default class UserRepository implements IUserRepository{
  private ormRepository : Repository<Users>;

  constructor(){
    this.ormRepository = getRepository(Users)
  }

  public async save(user:Users):Promise<Users>{
    await this.ormRepository.save(user)
    return user
  }

  public async create({name,email,password}:ICreateUserServices):Promise<Users>{

    const user = this.ormRepository.create(
           { name,
            email,
            password}
    )
    await this.ormRepository.save(user)
    return user
  }
  



  public async FindByName(name:string):Promise<Users | undefined>{
    const user = await this.ormRepository.findOne({
      where:{
        name
      }
    })
    return user;

  }
  public async FindByID(id:string):Promise<Users | undefined>{
    const user = await this.ormRepository.findOne({
      where:{
        id
      }
    })
    return user;

  }
  public async FindByEmail(email:string):Promise<Users | undefined>{
    const user = await this.ormRepository.findOne({
      where:{
        email
      }
    })
    return user;
  }
  public async FindAll():Promise<Users[]>{
    const user = await this.ormRepository.find()
    return user
  }


}
