import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
    ){}



  public async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {

    const productExists = await this.productRepository.FindByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = this.productRepository.create({
      name,
      price,
      quantity,
    });

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST')

    return product;
  }
}
export default CreateProductService;
