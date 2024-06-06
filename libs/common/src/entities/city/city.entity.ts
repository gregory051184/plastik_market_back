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
import { UserEntity } from '../user/user.entity';

@Entity('cities')
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ default: false })
  other: boolean;

  @CreateDateColumn()
  public createdAt: string;

  @UpdateDateColumn()
  public updatedAt: string;

  @OneToMany(() => ItemEntity, (item) => item.city)
  item: ItemEntity[];

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;
}
