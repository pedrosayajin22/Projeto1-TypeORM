import {Request,Response} from 'express'
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';

export default class ProfileController {

  public async show(req:Request,res:Response):Promise<Response>{
    const user_id = req.user.id;

    const showprofile = new ShowProfileService();
    const Users = await showprofile.execute({user_id});

    return res.json(instanceToInstance(Users))
  }
  public async update(req:Request,res:Response):Promise<Response>{
    const user_id = req.user.id;
    const {name,email,password,old_password} = req.body;
    const updateprofile = new UpdateProfileService();
    const user = await updateprofile.execute({user_id,name,email,password,old_password})
    return res.json(instanceToInstance(user))

  }
}
