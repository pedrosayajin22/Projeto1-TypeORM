import AppError from '@shared/errors/AppError';
import Users from '../infra/typeorm/entities/Users';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from "fs"
import { IUpdatedUserAvatarServices } from '../domain/models/IUpdatedUserAvatarServices';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';



@injectable()
export default class UpdateUserAvatarServices{
constructor(
  @inject("UserRepository")
  private userRepository : IUserRepository
){}


  public async execute({user_id,avatarFilename,}:IUpdatedUserAvatarServices): Promise<Users>{

    const user = await this.userRepository.FindByID(user_id)

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
    await this.userRepository.save(user)

    return user
  }
}
