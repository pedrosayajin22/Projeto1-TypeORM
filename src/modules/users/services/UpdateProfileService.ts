import { getCustomRepository } from 'typeorm';
import UserRepository from '../infra/typeorm/repositories/UsersRepositories';
import Users from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import { compare,hash } from 'bcrypt';


interface IRequest {
  user_id:string;
  name:string;
  email:string;
  password?:string;
  old_password?:string;
}


class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password}:IRequest): Promise<Users> {

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.FindByID(user_id);

    if(!user){
      throw new AppError("User not found.")
    }
    const updateEmail= await userRepository.FindByEmail(email)

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

    await userRepository.save(user)

    return user;

  }
}
export default UpdateProfileService;





