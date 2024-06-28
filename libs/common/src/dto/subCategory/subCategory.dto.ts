import {IsNumber, IsString} from "class-validator";

export class SubCategoryDto {

    @IsString({message: "Должно быть строкой"})
    title: string;

    @IsNumber({}, {message: 'Должно быть число'})
    categoryId: number;

    @IsNumber({}, {message: 'Должно быть число'})
    userId: number;
}