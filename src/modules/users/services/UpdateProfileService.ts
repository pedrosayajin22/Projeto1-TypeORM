import { getCustomRepository } from 'typeorm';
import UserRepository from '../infra/typeorm/repositories/UsersRepositories';
import Users from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import { compare,hash } from 'bcrypt';
import { IUpdatedProfileservice } from '../domain/models/IUpdatedProfileservice';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';



@injectable()
class UpdateProfileService {
  constructor(
    @inject("UserRepository")
    private userRepository:IUserRepository
  ){}




  public async execute({
    user_id,
    name,
    email,
    password,
    old_password}:IUpdatedProfileservice): Promise<Users> {

    const user = await this.userRepository.FindByID(user_id);

    if(!user){
      throw new AppError("User not found.")
    }
    const updateEmail= await this.userRepository.FindByEmail(email)

    if(updateEmail && updateEmail.id !== user_id){
      throw new AppError("There is already one user with this email.")

    }

    if(password && !old_password){
      throw new AppError("Old password is required.")
    }

    if (password && old_password){
      const checkOldPassword = await compare(old_password,user.password)
      if(!checkOldPassword){
        throw new AppError("Old password does not match.")
      }
      user.password= await hash(password,12)
    }

    user.name=name
    user.email=email

    await this.userRepository.save(user)

    return user;

  }
}
export default UpdateProfileService;





