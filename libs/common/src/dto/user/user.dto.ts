import {IsBoolean, IsNumber, IsString, Length} from "class-validator";

export class UserDto {

    @IsString({message: "Должно быть строкой"})
    chatId: string;

    @IsBoolean({message: "Значение должно быть true/false"})
    isBot: boolean;

    @IsString({message: "Должно быть строкой"})
    firstName: string;

    @IsString({message: "Должно быть строкой"})
    username: string;

    @IsBoolean({message: "Значение должно быть true/false"})
    admin?: boolean;

    @IsBoolean({message: "Значение должно быть true/false"})
    banned?: boolean;

    @IsString({message: "Должно быть строкой"})
    contactPerson?: string;

    @IsString({message: "Должно быть строкой"})
    phone?: string;

    @IsString({message: "Должно быть строкой"})
    email?: string;

    @IsString({message: "Должно быть строкой"})
    address?: string;

    //@IsString({message: "Должно быть строкой"})
    //subCategory?: any;

    //@IsNumber({}, {message: 'Должно быть число'})
    subscribe?: any;
}