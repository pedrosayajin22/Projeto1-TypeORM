import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepository';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';


interface IRequest {
  id:string
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository
    ){}


  public async execute({id}:IRequest): Promise<void> {
    const customer = await this.customerRepository.FindById(id);
    if(!customer){
      throw new AppError("Customer not found.")
    }

    await this.customerRepository.remove(customer)




  }
}
export default DeleteCustomerService;
