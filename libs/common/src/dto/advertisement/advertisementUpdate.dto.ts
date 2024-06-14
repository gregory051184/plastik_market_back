import {IsNumber, IsString} from "class-validator";

export class AdvertisementUpdateDto {

    @IsNumber({}, {message: 'Должно быть число'})
    id: number;

    @IsString({message: "Должно быть строкой"})
    title: string;

    @IsNumber({}, {message: 'Должно быть число'})
    price: number;

    @IsString({message: "Должно быть строкой"})
    description: string;

    @IsString({message: "Должно быть строкой"})
    startDate: string;

    @IsString({message: "Должно быть строкой"})
    finishDate: string;
}