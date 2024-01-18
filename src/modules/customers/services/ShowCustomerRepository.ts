import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { IShowCustomer } from '../domain/models/IShowCustomer';


@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository
    ){}


    public async execute({id}:IShowCustomer): Promise<Customer> {
    const customer = await this.customerRepository.FindById(id);
    if(!customer){
      throw new AppError("User not found.")
    }



    return customer;

  }
}
export default ShowCustomerService;
