import { IsNumber, IsString } from 'class-validator';

export class SubCategoryUpdateDto {
  @IsNumber({}, { message: 'Должно быть число' })
  id: number;

  @IsString({ message: 'Должно быть строкой' })
  title?: string;

  @IsNumber({}, { message: 'Должно быть число' })
  categoryId?: number;
}
