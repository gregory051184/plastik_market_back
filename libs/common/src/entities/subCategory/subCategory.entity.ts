import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {CategoryEntity} from "../category/category.entity";
import {ItemEntity} from "../item/item.entity";

@Entity('subcategories')
export class SubCategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @CreateDateColumn()
    public createdAt: string;

    @UpdateDateColumn()
    public updatedAt: string;

    @ManyToOne(() => CategoryEntity, category => category.id)
    @JoinColumn()
    category: CategoryEntity;

    @OneToMany(() => ItemEntity, item => item.subCategory)
    items: ItemEntity[];
}