import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Users from '../infra/typeorm/entities/Users';
import UserRepository from '../infra/typeorm/repositories/UsersRepositories';
import { hash } from 'bcrypt';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

 class CreateUserServices{
  public async execute({name,email,password}:IRequest): Promise<Users>{
    const userRepository=getCustomRepository(UserRepository);
    const emailExist=await userRepository.FindByEmail(email);
    if(emailExist){
      throw new AppError('Email address already used');
    }
  const hashPassword= await hash(password,12)
  const user= userRepository.create({
    name,
    email,
    password:hashPassword
  });
  await userRepository.save(user);

  return user;
  }
}
export default CreateUserServices
