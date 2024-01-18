import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, UpdateDateColumn } from "typeorm";
import { IOrder } from "@modules/orders/domain/models/IOrder";
import OrdersProducts from "./OrdersProducts";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";



@Entity("orders")
export default class Order implements IOrder{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({name:"customer_id"})
  customer:Customer;

  @Column('int')
  order: number;

  @OneToMany(() => OrdersProducts, order_products => order_products.order,{
    cascade:true
  })
  order_products:OrdersProducts[]


  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;

}

