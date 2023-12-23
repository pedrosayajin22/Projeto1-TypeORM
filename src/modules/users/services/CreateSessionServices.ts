import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import UserRepository from '../typeorm/repositories/UsersRepositories';
import { compare, compareSync, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import authConfig from "@config/auth"

interface IRequest {
  email: string;
  password: string;
}

interface IResponse{
user:Users,
token:string

}

export class CreateSessionsServices{
  public async execute({email,password}:IRequest): Promise<IResponse>{
    const userRepository=getCustomRepository(UserRepository);
    const user=await userRepository.FindByEmail(email);
    if(!user){
      throw new AppError('Incorred Email/Password combination',401);
    }

    const comparePassword= await compare(password,user.password)

    if(!comparePassword){
      throw new AppError('Incorred Email/Password combination',401);
    }

    const token = await sign({},authConfig.jwt.secret,{
      subject:user.id,
      expiresIn:authConfig.jwt.expiresIn
    })

  return {
    user,
    token
  };
  }
}
