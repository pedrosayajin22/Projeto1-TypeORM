import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepository';


interface IRequest {
  name: string;
  email: string;
}

 class CreateCustomerServices{
  public async execute({name,email}:IRequest): Promise<Customer>{
    const customerRepository=getCustomRepository(CustomerRepository);
    const emailExist=await customerRepository.FindByEmail(email);
    if(emailExist){
      throw new AppError('Email address already used');
    }
  const customers= customerRepository.create({
    name,
    email,
  });
  await customerRepository.save(customers);



  return customers;
  }
}
export default CreateCustomerServices
