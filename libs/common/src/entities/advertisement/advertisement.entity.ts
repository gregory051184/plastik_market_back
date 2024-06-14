import {ItemEntity} from "@app/common/entities/item/item.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";



@Entity( 'advertisements')
export class AdvertisementEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    startDate: string;

    @Column({nullable: false})
    finishDate: string;

    @CreateDateColumn()
    public createdAt: string;

    @UpdateDateColumn()
    public updatedAt: string;

    //@OneToOne(() => ItemEntity)
    //@JoinColumn()
    //item: ItemEntity;
}



