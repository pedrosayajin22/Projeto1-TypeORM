import { EntityRepository,In,Repository} from "typeorm";
import Product from "../entities/Product";

interface IFindProducts{
  id:string
}

@EntityRepository(Product)
export  class ProductRepository extends Repository<Product>{
  public async FindByName(name:string):Promise<Product | undefined>{
    const product= await this.findOne({
      where:{
        name
      }
    });
    return product;
  }

  public async FindAllByIds(products:IFindProducts[]):Promise<Product[]>{
    const productIds=  products.map(product => product.id);
    const existsProducts = await this.find({
      where:{
        id:In(productIds)
      }
    })
    return existsProducts
  }
}
