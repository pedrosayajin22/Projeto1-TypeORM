import AppError from '@shared/errors/AppError';

import UserTokenRepository from '../infra/typeorm/repositories/UserTokenRepositories';
import {isAfter,addHours, add} from "date-fns"
import {hash} from "bcrypt"
import { IResetPasswordService } from '../domain/models/IResetPasswordService';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';


@injectable()
class ResetPassword {
  constructor(
    @inject("UserRepository")
    private userRepository:IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository:UserTokenRepository
  ){}



  public async execute({ token,password }: IResetPasswordService): Promise<void> {


    const userToken =await this.userTokenRepository.FindByToken(token)
    console.log(userToken);

    if(!userToken){
      console.log("Erro no userToken");

      throw new AppError("UserToken does not exists")
    }

    const user = await this.userRepository.FindByID(userToken.user_id)
    console.log(user);


    if(!user){
      console.log("Erro no user ");

      throw new AppError("User does not exists")
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt,2)

    if(isAfter(Date.now(),compareDate)){
      console.log("Erro no date");

      throw new AppError("Token invalid.")
    }

    user.password=await hash(password,8)

    await this.userRepository.save(user);
  }
}
export default ResetPassword;
