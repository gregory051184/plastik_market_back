import {IsNumber, IsString} from "class-validator";

export class AdvertisementDto {

    @IsString({message: "Должно быть строкой"})
    title: string;

    @IsNumber({}, {message: 'Должно быть число'})
    price: number;

    @IsString({message: "Должно быть строкой"})
    description: string;

    @IsNumber({}, {message: 'Должно быть число'})
    userId: number;

    //@IsString({message: "Должно быть строкой"})
    //startDate: string;

    //@IsString({message: "Должно быть строкой"})
    //finishDate: string;
}