import {Request,Response} from 'express'
import ListCustomerServices from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerRepository';
import CreateCustomerServices from '../../../services/CreateCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import { container } from 'tsyringe';


export default class CustomersControllers {

  public async index(req:Request,res:Response):Promise<Response>{
    const ListCustomers = container.resolve(ListCustomerServices);

    const customers =  await ListCustomers.execute();

    return res.json(customers)
  }

  public async show(req:Request,res:Response):Promise<Response>{
    const {id} = req.params;
    const showCustomer = container.resolve(ShowCustomerService);
    const customers = await showCustomer.execute({id})
    return res.json(customers)
  }

  public async create(req:Request,res:Response):Promise<Response>{
    const {name,email} = req.body;
    const createCustomer=  container.resolve(CreateCustomerServices)
    const customers = await createCustomer.execute({name,email })
    return res.json(customers)
  }

  public async update(req:Request,res:Response):Promise<Response>{
    const {id} =req.params;
    const {name,email} = req.body;
    const updateCustomer = container.resolve(UpdateCustomerService);
    const customers=await updateCustomer.execute({id,name,email})
    return res.json(customers)
  }

  public async delete(req:Request,res:Response):Promise<Response>{
    const {id} = req.params;
    const destroyCustomer= container.resolve(DeleteCustomerService);
    await destroyCustomer.execute({id})
    return res.json([])
  }
}
