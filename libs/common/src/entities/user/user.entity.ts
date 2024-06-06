import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemEntity } from '../item/item.entity';
import { SubscriptionEntity } from '../subscription/subscription.entity';
import { CityEntity } from '../city/city.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  chatId: string;

  @Column({ default: false })
  isBot: boolean;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true })
  username: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ default: false })
  banned: boolean;

  @Column({ nullable: true })
  contactPerson: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @CreateDateColumn()
  public createdAt: string;

  @UpdateDateColumn()
  public updatedAt: string;

  @OneToMany(() => ItemEntity, (item) => item.buyer)
  items: ItemEntity[];

  @OneToMany(() => CityEntity, (city) => city.user)
  cities: CityEntity[];

  @ManyToOne(() => SubscriptionEntity, (subscription) => subscription.id)
  @JoinColumn()
  subscribe: SubscriptionEntity;
}
