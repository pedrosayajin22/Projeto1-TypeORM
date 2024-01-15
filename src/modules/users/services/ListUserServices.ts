import { getCustomRepository } from 'typeorm';
import UserRepository from '../infra/typeorm/repositories/UsersRepositories';
import Users from '../infra/typeorm/entities/Users';




class ListUserServices {
  public async execute(): Promise<Users[]> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.find();
    return user;
  }
}
export default ListUserServices;
