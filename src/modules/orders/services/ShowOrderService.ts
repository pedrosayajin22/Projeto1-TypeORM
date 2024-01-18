import AppError from '@shared/errors/AppError';
import { IShowOrder } from '../domain/models/IShowOrder';
import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import Order from '../infra/typeorm/entities/Order';


@injectable()
class ShowOrderService {
  constructor(
    @inject("OrderRepository")
    private ormRepostiory:IOrderRepository
  ){}



  public async execute({ id }: IShowOrder): Promise<Order> {


  const order = await this.ormRepostiory.FindById(id);

    if (!order) {
      throw new AppError('Could not find any order ');
    }

    return order;
  }
}
export default ShowOrderService;







