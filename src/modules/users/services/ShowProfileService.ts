import { getCustomRepository } from 'typeorm';
import UserRepository from '../infra/typeorm/repositories/UsersRepositories';
import Users from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';


interface IRequest {
  user_id:string
}


class ShowProfileService {
  public async execute({user_id}:IRequest): Promise<Users> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.FindByID(user_id);
    if(!user){
      throw new AppError("User not found.")
    }



    return user;

  }
}
export default ShowProfileService;
