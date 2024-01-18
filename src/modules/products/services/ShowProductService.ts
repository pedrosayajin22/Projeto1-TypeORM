import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { IShowProduct } from '../domain/models/IShowProduct';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';


@injectable()
class ShowProductServices {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
    ){}

  public async execute({id}:IShowProduct): Promise<Product> {
    const product = await this.productRepository.FindById(id);
    if (!product) {
      throw new AppError('Product not found');
    }
    return product;
  }
}
export default ShowProductServices;
