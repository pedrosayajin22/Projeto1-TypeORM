import { EntityRepository,Repository} from "typeorm";
import Customer from "../entities/Customer";



@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer>{
  public async FindByName(name:string):Promise<Customer | undefined>{
    const customer= await this.findOne({
      where:{
        name
      }
    });
    return customer;
  }
  public async FindById(id:string):Promise<Customer | undefined>{
    const customer= await this.findOne({
      where:{
        id
      }
    });
    return customer;
  }
  public async FindByEmail(email:string):Promise<Customer | undefined>{
    const customer= await this.findOne({
      where:{
        email
      }
    });
    return customer;
  }
}
