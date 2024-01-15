import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Users from '../infra/typeorm/entities/Users';
import UserRepository from '../infra/typeorm/repositories/UsersRepositories';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from "fs"


interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarServices{
  public async execute({user_id,avatarFilename,}:IRequest): Promise<Users>{
    const userRepository=getCustomRepository(UserRepository);

    const user = await userRepository.FindByID(user_id)

    if(!user){
      throw new AppError("User not found.")
    }

    if(user.avatar){
      const userAvatarFilePath= path.join(uploadConfig.directory,user.avatar)
      const userAvatarFileExist= await fs.promises.stat(userAvatarFilePath)

      if(userAvatarFileExist){
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar=avatarFilename;
    await userRepository.save(user)

    return user
  }
}
