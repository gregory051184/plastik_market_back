import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemEntity } from '../item/item.entity';
import { UserEntity } from '../user/user.entity';

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  public createdAt: string;

  @UpdateDateColumn()
  public updatedAt: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ManyToMany(() => ItemEntity)
  @JoinTable({ name: 'cart_item' })
  items: ItemEntity[];
}
