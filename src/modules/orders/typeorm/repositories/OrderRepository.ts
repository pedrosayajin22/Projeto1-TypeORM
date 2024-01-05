import { EntityRepository,Repository} from "typeorm";
import Order from "../entities/Order";
import Customer from "@modules/customers/typeorm/entities/Customer";

interface IProduct{
  product_id:string,
  price:number
  quantity:number
}

interface IRequest{
  customer:Customer,
  product:IProduct[]
}


@EntityRepository(Order)
export default class OrderRepository extends Repository<Order>{
  public async FindById(id:string):Promise<Order | undefined>{
    const order= await this.findOne(id,{
      relations:["customer","order_products"]
    });
    return order;
  }

  public async CreateOrder({customer,product}:IRequest):Promise<Order>{
    const order= this.create(
      {
      customer,
      order_products:product
    }
    );

    await this.save(order)

    return order;
  }
}
