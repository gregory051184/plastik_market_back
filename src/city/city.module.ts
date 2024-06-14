import {forwardRef, Module} from '@nestjs/common';
import {CityController} from "./city.controller";
import {CitiesService} from "./services/cities.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CityEntity, CommonModule, PlastikMarketDbModule} from "@app/common";
import {CitiesBotListService} from "./services/lists/citiesBotList.service";
import {UsersModule} from "../users/users.module";



@Module({
    imports: [
        TypeOrmModule.forFeature([CityEntity]),
        PlastikMarketDbModule,
        CommonModule,
        forwardRef(() => UsersModule),
        //UsersModule
    ],
    controllers: [CityController],
    providers: [CitiesService, CitiesBotListService],
    exports: [CitiesService, CitiesBotListService]
})
export class CityModule {}