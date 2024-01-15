import { createQueryBuilder, getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IPaginateCustomer {
from:number,
to:number,
per_page:number,
total:number,
current_page:number,
prev_page:number | null,
next_page:number | null,
data:Customer[];
}

class ListCustomerServices {
  public async execute(): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomerRepository);
    const customers = await customersRepository.createQueryBuilder().paginate();
    return customers as IPaginateCustomer;
  }
}
export default ListCustomerServices;
