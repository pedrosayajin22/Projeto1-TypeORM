import { EntityRepository,In,Repository, getRepository} from "typeorm";
import Product from "../entities/Product";
import { IFindProducts } from "@modules/products/domain/models/IFindProducts";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { IProduct } from "@modules/products/domain/models/IProduct";
import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";



export  class ProductRepository implements IProductRepository{
  private ormRepository : Repository<Product>;

  constructor(){
    this.ormRepository = getRepository(Product)
  }
  public async save(product:Product):Promise<Product>{
    await this.ormRepository.save(product)
    return product
  }
  public async remove(product:Product):Promise<void>{
    await this.ormRepository.remove(product)
  }

  public async create({name,price,quantity}:ICreateProduct):Promise<Product>{
    const product = this.ormRepository.create({name,price,quantity})
    await this.ormRepository.save(product)
    return product
  }



  public async FindByName(name:string):Promise<Product | undefined>{
    const product= await this.ormRepository.findOne({
      where:{
        name
      }
    });
    return product;
  }
  public async FindAll():Promise<Product[]>{
    const product= await this.ormRepository.find()
    return product;
  };
  public async FindById(id:string):Promise<Product | undefined>{
    const product= await this.ormRepository.findOne({
      where:{
        id
      }
    });
    return product;
  }


  public async FindAllByIds(products:IFindProducts[]):Promise<Product[]>{
    const productIds=  products.map(product => product.id);
    const existsProducts = await this.ormRepository.find({
      where:{
        id:In(productIds)
      }
    })
    return existsProducts
  }
}
