import {
    CreateDateColumn,
    Entity,
    JoinColumn, JoinTable, ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ItemEntity} from "@app/common/entities/item/item.entity";
import {UserEntity} from "@app/common/entities/user/user.entity";

@Entity('carts')
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    public createdAt: string;

    @UpdateDateColumn()
    public updatedAt: string

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToMany(() => ItemEntity)
    @JoinTable({name:'cart_item'})
    items: ItemEntity[];


}