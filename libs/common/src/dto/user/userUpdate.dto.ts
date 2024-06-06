import { IsNumber, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsNumber({}, { message: 'Должно быть число' })
  id: number;

  @IsString({ message: 'Должно быть строкой' })
  contactPerson?: string;

  @IsString({ message: 'Должно быть строкой' })
  phone?: string;

  @IsString({ message: 'Должно быть строкой' })
  email?: string;

  @IsString({ message: 'Должно быть строкой' })
  address?: string;
}
