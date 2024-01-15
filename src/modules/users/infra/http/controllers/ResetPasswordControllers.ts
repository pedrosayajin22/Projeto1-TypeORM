import {Request,Response} from 'express'
import ResetPassword from '../../../services/ResetPasswordServices';
export default class ResetPasswordControllers {

  public async create(req:Request,res:Response):Promise<Response>{
    const {token,password} = req.body;
    const resetPassword = new ResetPassword();
    await resetPassword.execute({token,password})
    return res.status(204).json()
  }
}

