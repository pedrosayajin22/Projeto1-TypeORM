import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Users from '../infra/typeorm/entities/Users';
import UserRepository from '../infra/typeorm/repositories/UsersRepositories';
import { hash } from 'bcrypt';
import { ICreateUserServices } from '../domain/models/ICreateUserServices';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';


@injectable()
 class CreateUserServices{
  constructor(
    @inject("UserRepository")
    private userRepository : IUserRepository
  ){}



  public async execute({name,email,password}:ICreateUserServices): Promise<Users>{
    const emailExist=await this.userRepository.FindByEmail(email);
    if(emailExist){
      throw new AppError('Email address already used');
    }
  const hashPassword= await hash(password,12)
  const user= await this.userRepository.create({
    name,
    email,
    password:hashPassword
  });
  await this.userRepository.save(user);

  return user;
  }
}
export default CreateUserServices
