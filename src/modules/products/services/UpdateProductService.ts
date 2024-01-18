
import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { IUpdatedProduct } from '../domain/models/IUpdatedProduct';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';



@injectable()
class UpdateProductServices {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
    ){}







  public async execute({ id, name, quantity, price }: IUpdatedProduct): Promise<Product> {

    try {
      const product = await this.productRepository.FindById(id);

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      const findName = await this.productRepository.FindByName(name);

      if (findName && name !== product.name) {
        throw new AppError('There is already one product with this name', 409);
      }
    
      await RedisCache.invalidate('api-vendas-PRODUCT_LIST')


      product.name = name;
      product.quantity = quantity;
      product.price = price;

      await this.productRepository.save(product);

      return product;
    } catch (error) {
      // Certifique-se de lidar com a rejeição da promise corretamente
      console.error('Error in UpdateProductServices:', error);

      // Rejeite a promise novamente para que seja tratada pelo código cliente
      throw new AppError('Error updating product', 500);
    }
  }
}

export default UpdateProductServices;
