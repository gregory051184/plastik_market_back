import {
    Column,
    CreateDateColumn,
    Entity,
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



