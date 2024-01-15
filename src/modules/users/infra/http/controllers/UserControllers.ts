import {Request,Response} from 'express'
import ListUserServices from '../../../services/ListUserServices'
import  CreateUserServices  from '../../../services/CreateUserServices';
import {  instanceToInstance } from 'class-transformer';
export default class UsersController {

  public async index(req:Request,res:Response):Promise<Response>{
    const listUser = new ListUserServices();
    const user = await listUser.execute();

    return res.json(instanceToInstance(user))
  }
  public async create(req:Request,res:Response):Promise<Response>{
    const {name,email,password} = req.body;
    const createUser = new CreateUserServices();
    const user = await createUser.execute({name,email,password})
    return res.json(instanceToInstance(user))

  }
}
