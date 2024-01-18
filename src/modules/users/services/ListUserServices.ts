import Users from '../infra/typeorm/entities/Users';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';



@injectable()
class ListUserServices {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ){}



  public async execute(): Promise<Users[]> {
    const user = await this.userRepository.FindAll();
    return user;
  }
}
export default ListUserServices;
