import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString({ message: 'Должно быть строкой' })
  title: string;
}
