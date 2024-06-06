import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import {
  CartEntity,
  CommonModule,
  PlastikMarketDbModule,
  UserEntity,
} from '@app/common';
import { UsersBotListsService } from './services/lists/usersBotLists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersFormsService } from './services/forms/usersForms.service';
import { UsersBotItemsService } from './services/items/usersBotItems.service';
import { ItemModule } from '../items/item.module';
import { CityModule } from '../city/city.module';

@Module({
  imports: [
    forwardRef(() => ItemModule),
    //ItemModule,
    CommonModule,
    TypeOrmModule.forFeature([UserEntity, CartEntity]),
    PlastikMarketDbModule,
    //forwardRef(() =>CartModule),
    forwardRef(() => CityModule),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersBotListsService,
    UsersFormsService,
    UsersBotItemsService,
  ],
  exports: [
    UsersService,
    UsersBotListsService,
    UsersFormsService,
    UsersBotItemsService,
  ],
})
export class UsersModule {}
