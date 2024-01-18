import { EntityRepository,Repository, getRepository} from "typeorm";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { IOrderRepository } from "@modules/orders/domain/repositories/IOrderRepository";
import { ICreateOrder } from "@modules/orders/domain/models/ICreateOrder";
import Order from "../entities/Order";
import { IOrder } from "@modules/orders/domain/models/IOrder";


export  class OrderRepository  implements IOrderRepository {
  private ormRepository : Repository<Order>;

  constructor(){
    this.ormRepository=getRepository(Order)
  }

  public async save(order:IOrder):Promise<Order>{
    await this.ormRepository.save(order)
    return order
  }

  public async FindById(id:string):Promise<Order | undefined>{
    const order= await this.ormRepository.findOne(id,{
      relations:["customer","order_products"]
    });
    return order;
  }

  public async CreateOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products
    });

    await this.ormRepository.save(order);

    return order;
  }
}
