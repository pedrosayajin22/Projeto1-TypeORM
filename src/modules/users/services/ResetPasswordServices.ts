import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepositories';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepositories';
import {isAfter,addHours, add} from "date-fns"
import {hash} from "bcrypt"

interface IRequest {
  token: string;
  password:string;
}

class ResetPassword {
  public async execute({ token,password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken =await userTokenRepository.FindByToken(token)
    console.log(userToken);

    if(!userToken){
      console.log("Erro no userToken");

      throw new AppError("UserToken does not exists")
    }

    const user = await userRepository.FindByID(userToken.user_id)
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

    await userRepository.save(user);
  }
}
export default ResetPassword;
