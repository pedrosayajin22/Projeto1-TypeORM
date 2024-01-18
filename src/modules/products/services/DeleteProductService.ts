
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { IShowProduct } from '../domain/models/IShowProduct';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';



@injectable()
class DeleteProductServices {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
    ){}


  public async execute({id}:IShowProduct): Promise<void> {



    const product = await this.productRepository.FindById(id);
    if (!product) {
      throw new AppError('Product not found');
    }

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST')
    await this.productRepository.remove(product);

  }
}
export default DeleteProductServices;
