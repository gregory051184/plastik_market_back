import {IsString} from "class-validator";

export class CheckFileDto {

    @IsString({message: "Должно быть строкой"})
    title: string;

    @IsString({message: "Должно быть строкой"})
    owner: string;

    @IsString({message: "Должно быть строкой"})
    file: string;
}