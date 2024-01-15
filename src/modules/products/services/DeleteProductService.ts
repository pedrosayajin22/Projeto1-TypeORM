import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id:string
}


class DeleteProductServices {
  public async execute({id}:IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found');
    }
    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')
    await productsRepository.remove(product);

  }
}
export default DeleteProductServices;
