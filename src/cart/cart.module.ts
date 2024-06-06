import { forwardRef, Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './services/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CartEntity,
  CommonModule,
  ItemEntity,
  PlastikMarketDbModule,
} from '@app/common';
import { CartsFormsService } from './services/forms/cartsForms.service';
import { CartsBotItemService } from './services/items/cartsBotItem.service';
import { UsersModule } from '../users/users.module';
import { ItemModule } from '../items/item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, ItemEntity]),
    PlastikMarketDbModule,
    CommonModule,
    //forwardRef(() =>UsersModule),
    UsersModule,
    //ItemModule
    forwardRef(() => ItemModule),
  ],
  controllers: [CartController],
  providers: [CartService, CartsFormsService, CartsBotItemService],
  exports: [CartService, CartsFormsService, CartsBotItemService],
})
export class CartModule {}
