import {Request,Response} from 'express'
import SendForgotPasswordEmail from '../services/SendForgotPasswordEmail';
export default class ForgotPassword {

  public async create(req:Request,res:Response):Promise<Response>{
    const {email} = req.body;
    const sendForgotPasswordEmail = new SendForgotPasswordEmail();
    await sendForgotPasswordEmail.execute({email})
    return res.status(204).json()
  }
}

