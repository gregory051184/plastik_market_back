import {IsNumber, IsString} from "class-validator";

export class SubscribeDto {
    @IsString({message: "Должно быть строкой"})
    title: string;

    @IsNumber({}, {message: 'Должно быть число'})
    price: number;

    @IsString({message: "Должно быть строкой"})
    description: string;

    @IsNumber({}, {message: 'Должно быть число'})
    months: number;
}