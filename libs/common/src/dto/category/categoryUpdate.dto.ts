import { IsNumber, IsString } from 'class-validator';

export class CategoryUpdateDto {
  @IsNumber({}, { message: 'Должно быть число' })
  id: number;

  @IsString({ message: 'Должно быть строкой' })
  title: string;
}
