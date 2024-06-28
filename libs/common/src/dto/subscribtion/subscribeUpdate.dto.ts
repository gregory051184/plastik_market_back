import {IsNumber, IsString} from "class-validator";

export class SubscribeUpdateDto {

    @IsNumber({}, {message: 'Должно быть число'})
    id: number;

    @IsString({message: "Должно быть строкой"})
    title: string;

    @IsNumber({}, {message: 'Должно быть число'})
    price: number;

    @IsString({message: "Должно быть строкой"})
    description: string;

    @IsNumber({}, {message: 'Должно быть число'})
    itemsNumber: number;

    @IsNumber({}, {message: 'Должно быть число'})
    months: number;
}