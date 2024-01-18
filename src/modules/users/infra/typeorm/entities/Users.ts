import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Exclude,Expose} from "class-transformer"
import { IUser } from "@modules/users/domain/models/IUser";

@Entity("users")
export default class Users implements IUser{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password:string;

  @Column()
  avatar:string;

  @Column()
  email:string;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;

  @Expose({name:"avatar_url"})
  getAvatarUrl():string | null {
    if(!this.avatar){
      return null
    }
    return `${process.env.APP_WEB_URL}/avatar/${this.avatar}`
  }

}
