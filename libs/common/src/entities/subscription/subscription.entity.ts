import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";


@Entity('subscriptions')
export class SubscriptionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column({default: 0})
    price: number;

    @Column({nullable: false})
    description: string;

    @Column({default: 1})
    months: number;

    //____________________________________
    @Column({nullable: false})
    itemsNumber: number;
    //____________________________________

    @CreateDateColumn()
    public createdAt: string;

    @UpdateDateColumn()
    public updatedAt: string

    @OneToMany(() => UserEntity, user => user.subscribe)
    users: UserEntity[];


}
