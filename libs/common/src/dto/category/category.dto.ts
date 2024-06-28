import {IsNumber, IsString} from "class-validator";

export class CategoryDto {

    @IsString({message: "Должно быть строкой"})
    title: string;

    @IsNumber({}, {message: 'Должно быть число'})
    userId: number;
}