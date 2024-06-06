import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemEntity } from '../item/item.entity';
import { SubCategoryEntity } from '../subCategory/subCategory.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @CreateDateColumn()
  public createdAt: string;

  @UpdateDateColumn()
  public updatedAt: string;

  @OneToMany(() => ItemEntity, (item) => item.category)
  item: ItemEntity[];

  @OneToMany(() => SubCategoryEntity, (subCategory) => subCategory.category)
  subCategories: SubCategoryEntity[];
}
