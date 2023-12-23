import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepositories';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepositories';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmail {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user =await userRepository.FindByEmail(email)
    if(!user){
      throw new AppError("User does not exists")
    }
    const token = await userTokenRepository.generate(user.id)

    console.log(token);

    await userRepository.save(user);

    return;
  }
}
export default SendForgotPasswordEmail;
