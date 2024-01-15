import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import OrderRepository from '../infra/typeorm/repositories/OrderRepository';



interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);


  const order = await orderRepository.FindById(id);

    if (!order) {
      throw new AppError('Could not find any order ');
    }

    return order;
  }
}
export default ShowOrderService;







