import {Request,Response} from 'express'
import UpdateUserAvatarServices from '../services/UpdateUserAvatarServices'
export default class UsersAvatarController {

  public async update(req:Request,res:Response):Promise<Response>{
   const updateAvatar = new UpdateUserAvatarServices()

   if (!req.file) {
    throw new Error('File is required');
  }
   const user = updateAvatar.execute({
    user_id:req.user.id,
    avatarFilename:req.file.filename
   })
   return res.json(user)

  }
  
}

