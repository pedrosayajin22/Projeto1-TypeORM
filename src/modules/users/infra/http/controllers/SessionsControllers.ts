import {Request,Response} from "express"
import { CreateSessionsServices } from "../../../services/CreateSessionServices"
import { instanceToInstance } from "class-transformer"

export default class SessionsControllers {
public async create(req:Request,res:Response):Promise<Response>{
const {email,password}=req.body

const createSession = new CreateSessionsServices()

const user = await createSession.execute({email,password})

return res.json(instanceToInstance(user))

}
}
