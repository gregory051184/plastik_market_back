import {CreateDateColumn, Entity, JoinTable, OneToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {CartEntity, ItemEntity} from "@app/common";

/*@Entity('items_carts')
export class ItemCartEntity {

    @PrimaryColumn({type: "int"})
    cartsId: number;

    @PrimaryColumn({type: "int"})
    itemsId: number;

    @CreateDateColumn()
    public createdAt: string;

    @UpdateDateColumn()
    public updatedAt: string;

    @OneToOne(() => CartEntity)
    @JoinTable()
    cart: CartEntity;

    @OneToOne(() => ItemEntity)
    @JoinTable()
    item: ItemEntity;
}*/