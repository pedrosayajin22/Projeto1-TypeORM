import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';
interface IRequest {
  id:string;
  name:string;
  email:string;

}


class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
   }:IRequest): Promise<Customer> {

    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.FindById(id);

    if(!customer){
      throw new AppError("User not found.")
    }
    const updateEmail= await customerRepository.FindByEmail(email)

    if(updateEmail && email !== customer.email){
      throw new AppError("There is already one user with this email.")

    }

    customer.name=name
    customer.email=email

    await customerRepository.save(customer)

    return customer;

  }
}
export default UpdateCustomerService;








