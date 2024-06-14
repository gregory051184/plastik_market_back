import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, ManyToMany,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {CityEntity} from "@app/common/entities/city/city.entity";
import {AdvertisementEntity} from "@app/common/entities/advertisement/advertisement.entity";
import {CategoryEntity} from "@app/common/entities/category/category.entity";
import {CartEntity} from "@app/common/entities/cart/cart.entity";
import {UserEntity} from "@app/common/entities/user/user.entity";
import {SubCategoryEntity} from "@app/common/entities/subCategory/subCategory.entity";


@Entity('items')
export class ItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column({nullable: false})
    image: string;

    @Column('simple-array',{nullable: true})
    additionalImages: string[];

    @Column({nullable: false})
    description: string;

    @Column({nullable: false, default: 0})
    price: number;

    @Column({default: false})
    forSale: boolean;

    @Column({default: false})
    forBuying: boolean;

    //@Column({default: false})
    //isMachine: boolean;

    @Column({nullable: false})
    owner: string;

    @Column({default: false})
    sold: boolean;

    //@Column({nullable: true, default: 0})
    //subscribe: number;

    @Column({nullable: true})
    unitOfMeasurement: string;

    @CreateDateColumn()
    public createdAt: string;

    @UpdateDateColumn()
    public updatedAt: string

    @ManyToOne(() => CityEntity, city => city.id)
    @JoinColumn()
    city: CityEntity;

    @OneToOne(() => AdvertisementEntity)
    @JoinColumn()
    advertisement: AdvertisementEntity;

    @ManyToOne(() => CategoryEntity, category => category.id)
    @JoinColumn()
    category: CategoryEntity;

    @ManyToOne(() => SubCategoryEntity, subCategory => subCategory.id)
    @JoinColumn()
    subCategory: SubCategoryEntity;

    //@ManyToMany(() => CartEntity, cart => cart.items)
    //@JoinColumn()
    //carts: CartEntity[];

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn()
    buyer: UserEntity;

}



