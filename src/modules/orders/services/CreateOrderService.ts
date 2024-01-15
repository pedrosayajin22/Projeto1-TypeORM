import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import OrderRepository from '../infra/typeorm/repositories/OrderRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
interface IProduct{
  id:string,
  quantity:number
}


interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const customerRepository = getCustomRepository(CustomerRepository)
    const productRepository= getCustomRepository(ProductRepository)


    const customerExists = await customerRepository.FindById(customer_id);


    if (!customerExists) {
      throw new AppError('Could not find any customer ');
    }


    const productExists = await productRepository.FindAllByIds(products)

    if(!productExists.length){
      throw new AppError("Product not exists with the given ids")
    }


    const existsProductsIds=productExists.map(product => product.id)


    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id)
    )



    if(checkInexistentProducts.length){
      throw new AppError(`Product not exists ${checkInexistentProducts[0].id}`)
    }


    const quantityAvailable = products.filter(
      product => productExists.filter(
        p => p.id === product.id
      )[0].quantity < product.quantity
    )



    if(quantityAvailable.length){
      throw new AppError(`${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`)
    }



    const serializedProducts = products.map(product => ({
      product_id:product.id,
      quantity:product.quantity,
      price:productExists.filter(p => p.id === product.id)[0].price
    }))


    const order = await orderRepository.CreateOrder({
      customer:customerExists,
      product:serializedProducts
    })


    const {order_products} = order;


    const updatedProductQuantity = order_products.map(product => ({
      id:product.product_id,
      quantity:productExists.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }))


    await productRepository.save(updatedProductQuantity);

    return order;
  }
}
export default CreateOrderService;





