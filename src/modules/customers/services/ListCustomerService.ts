import Customer from '../infra/typeorm/entities/Customer';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';


@injectable()
class ListCustomerServices {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository
    ){}

  public async execute(): Promise<Customer[] | undefined> {

    const customers = await this.customerRepository.FindAll();
    return customers ;
  }
}
export default ListCustomerServices;
