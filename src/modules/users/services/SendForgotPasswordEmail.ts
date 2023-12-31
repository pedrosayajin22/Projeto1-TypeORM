import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepositories';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepositories';
import EtherealMail from '@config/mail/EherealMail';
import path, { dirname } from "path"


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
    const {token} = await userTokenRepository.generate(user.id)
    const ForgotPasswordTemplate = path.resolve(__dirname,
      "..",
      "views",
      "forgot_password.hbs"
      )

      await EtherealMail.sendMail({
      to:{
        name:user.name,
        email:user.email
      },
      subject:"[Api Vendas] Recuperação de Senha",
      templateData:{
        file:ForgotPasswordTemplate,
        variables:{
          name:user.name,
          link:`http://localhost:3000/reset_password?token=${token}`


        }
      }
    })



    return;
  }
}
export default SendForgotPasswordEmail;
