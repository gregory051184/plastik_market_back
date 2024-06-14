import {Injectable} from '@nestjs/common';
import {UsersService} from "../../users/services/users.service";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity, ItemEntity, UserEntity} from "@app/common";
import {Repository} from "typeorm";
import {ItemService} from "../../items/services/item.service";


@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity) private readonly cartsRepository: Repository<CartEntity>,
        private readonly usersService: UsersService,
        private readonly itemService: ItemService,
    ) {
    }

    async create(userId: number): Promise<CartEntity> {
        const currentUser: UserEntity = await this.usersService.getById(userId)
        const cart: CartEntity = await this.cartsRepository.create({user: currentUser})

        cart.items = []
        await this.cartsRepository.save(cart)

        return cart;
    };

    async getByUserId(userId: number): Promise<CartEntity> {
        const cart: CartEntity = await this.cartsRepository.findOne({where: {user: {id: userId}}, relations: {items: true}});
        return cart
    };

    async addItemToFavorite(chatId: string, itemId: number): Promise<void> {
        const currentUser: UserEntity = await this.usersService.getByChatId(chatId.toString());
        const cart: CartEntity = await this.cartsRepository.findOne({
            where: {user: {id: currentUser.id}},
            relations: {items: true}
        });
        const item: ItemEntity = await this.itemService.getById(itemId);
        cart.items = [...cart.items, item];
        await this.cartsRepository.save(cart);

    };

    async deleteItemFromFavorite(chatId: string, itemId: number): Promise<void> {
        const currentUser: UserEntity = await this.usersService.getByChatId(chatId);
        const cart: CartEntity = await this.cartsRepository.findOne({
            where: {user: {id: currentUser.id}},
            relations: {items: true}
        });
        cart.items = cart.items.filter(item => item.id !== itemId);
        await this.cartsRepository.save(cart);

    };

    async deleteAllItemsFromFavorite(chatId: string, itemId: number): Promise<void> {
        const currentUser: UserEntity = await this.usersService.getByChatId(chatId);
        const cart: CartEntity = await this.cartsRepository.findOne({
            where: {user: {id: currentUser.id}},
            relations: {items: true}
        });
        cart.items = [];
        await this.cartsRepository.save(cart);
    };
}