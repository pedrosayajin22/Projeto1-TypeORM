
import Users from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import { IShowProfileService } from '../domain/models/IShowProfileService';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';




@injectable()
class ShowProfileService {
constructor(
  @inject("UserRepository")
  private userRepository:IUserRepository
){}


  public async execute({user_id}:IShowProfileService): Promise<Users> {
    const user = await this.userRepository.FindByID(user_id);
    if(!user){
      throw new AppError("User not found.")
    }



    return user;

  }
}
export default ShowProfileService;
