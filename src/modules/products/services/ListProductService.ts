import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import Product from '../infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';


class ListProductServices {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    let produtos = await redisCache.recover<Product[]>(
      "api-vendas-PRODUCT_LIST")

      if (!produtos) {
        produtos = await productsRepository.find();

        await redisCache.save("api-vendas-PRODUCT_LIST", produtos)
      }


    return produtos;
  }
}
export default ListProductServices;
