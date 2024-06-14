import {IsBoolean, IsNumber, IsString} from "class-validator";

export class ItemDto {

    @IsString({message: "Должно быть строкой"})
    title: string;

    @IsString({message: "Должно быть строкой"})
    image: string;

    additionalImages?: string[];

    @IsString({message: "Должно быть строкой"})
    description: string;

    @IsNumber({}, {message: 'Должно быть число'})
    price: number;

    @IsBoolean({message: "Значение должно быть true/false"})
    forSale?: boolean;

    @IsBoolean({message: "Значение должно быть true/false"})
    forBuying?: boolean;

    //@IsBoolean({message: "Значение должно быть true/false"})
    //isMachine: boolean;

    @IsString({message: "Должно быть строкой"})
    owner: string;

    @IsBoolean({message: "Значение должно быть true/false"})
    sold?: boolean;

    @IsString({message: "Должно быть строкой"})
    unitOfMeasurement: string;

    @IsNumber({}, {message: 'Должно быть число'})
    cityId: number;

    @IsNumber({}, {message: 'Должно быть число'})
    advertisementId?: number;

    @IsNumber({}, {message: 'Должно быть число'})
    categoryId: number;

    @IsNumber({}, {message: 'Должно быть число'})
    cartId?: number;

    @IsNumber({}, {message: 'Должно быть число'})
    buyerId?: number;

    @IsNumber({}, {message: 'Должно быть число'})
    subCategoryId: number;
}