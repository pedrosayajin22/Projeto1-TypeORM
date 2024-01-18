import AppError from '@shared/errors/AppError';

import EtherealMail from '@config/mail/EherealMail';
import path, { dirname } from "path"
import { ISendForgotPasswordEmail } from '../domain/models/ISendForgotPasswordEmail';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';



@injectable()
class SendForgotPasswordEmail {
  constructor(
    @inject("UserRepository")
    private userRepository:IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository:IUserTokenRepository
  ){}



  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {

    const user =await this.userRepository.FindByEmail(email)
    if(!user){
      throw new AppError("User does not exists")
    }
    const {token} = await this.userTokenRepository.generate(user.id)
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
          link:`${process.env.APP_WEB_URL}/reset_password?token=${token}`


        }
      }
    })



    return;
  }
}
export default SendForgotPasswordEmail;
