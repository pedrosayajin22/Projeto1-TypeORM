import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';
interface IRequest {
  id:string
}


class ShowCustomerService {
  public async execute({id}:IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.FindById(id);
    if(!customer){
      throw new AppError("User not found.")
    }



    return customer;

  }
}
export default ShowCustomerService;
