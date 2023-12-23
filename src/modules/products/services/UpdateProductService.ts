import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name:string,
  quantity:number,
  price:number
}


class UpdateProductServices {
  public async execute({ id, name, quantity, price }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    try {
      const product = await productsRepository.findOne(id);

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      const findName = await productsRepository.FindByName(name);

      if (findName && name !== product.name) {
        throw new AppError('There is already one product with this name', 409);
      }

      product.name = name;
      product.quantity = quantity;
      product.price = price;

      await productsRepository.save(product);

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
