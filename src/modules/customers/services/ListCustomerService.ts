import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';




class ListCustomerServices {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomerRepository);
    const customers = await customersRepository.find();
    return customers;
  }
}
export default ListCustomerServices;
