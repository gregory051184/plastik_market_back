import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ItemsFilterDto {
  @IsString({ message: 'Должно быть строкой' })
  title?: string;

  @IsString({ message: 'Должно быть строкой' })
  price?: string;

  @IsString({ message: 'Должно быть строкой' })
  city?: string;

  @IsNumber({}, { message: 'Должно быть число' })
  category?: number;

  @IsNumber({}, { message: 'Должно быть число' })
  subCategoryId?: number;

  @IsBoolean({ message: 'Значение должно быть true/false' })
  forSale: boolean;
}
