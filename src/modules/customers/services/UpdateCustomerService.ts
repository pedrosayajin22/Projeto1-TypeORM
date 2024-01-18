import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';
import { inject, injectable } from 'tsyringe';
import { IUpdatedCustomer } from '../domain/models/IUpdatedCustomer';


@injectable()
class UpdateCustomerService {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: CustomerRepository
  ){}




  public async execute({
    id,
    name,
    email,
   }:IUpdatedCustomer): Promise<Customer> {

    const customer = await this.customerRepository.FindById(id);

    if(!customer){
      throw new AppError("User not found.")
    }
    const updateEmail= await this.customerRepository.FindByEmail(email)

    if(updateEmail && email !== customer.email){
      throw new AppError("There is already one user with this email.")

    }

    customer.name=name
    customer.email=email

    await this.customerRepository.save(customer)

    return customer;

  }
}
export default UpdateCustomerService;








