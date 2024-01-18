
import { inject, injectable } from 'tsyringe';
import RedisCache from '@shared/cache/RedisCache';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
class ListProductServices {
    constructor(
      @inject('ProductRepository')
      private productRepository: IProductRepository
      ){}

  public async execute(): Promise<IProduct[]>{

    let produtos = await RedisCache.recover<IProduct[]>(
      "api-vendas-PRODUCT_LIST")

      if (!produtos) {
        produtos = await this.productRepository.FindAll();

        await RedisCache.save("api-vendas-PRODUCT_LIST", produtos)
      }


      return produtos;
    }
  }

export default ListProductServices;
