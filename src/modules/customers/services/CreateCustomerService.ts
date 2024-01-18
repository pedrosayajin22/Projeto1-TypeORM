import AppError from '@shared/errors/AppError';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';



@injectable()
 class CreateCustomerServices{
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository
    ){}

  public async execute({name,email}:ICreateCustomer): Promise<ICustomer>{

    const emailExist=await this.customerRepository.FindByEmail(email);
    if(emailExist){
        throw new AppError('Email address already used');
      }
    const customers= await this.customerRepository.create({
      name,
      email,
    });
    return customers;
  }





}
export default CreateCustomerServices
