import {IsBoolean, IsNumber, IsString} from "class-validator";

export class CityDto {

    @IsString({message: "Должно быть строкой"})
    title: string;

    @IsBoolean({message: "Значение должно быть true/false"})
    other?: boolean;

    @IsNumber({}, {message: 'Должно быть число'})
    userId: number;
}