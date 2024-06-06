import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserEntity, UserUpdateDto } from '@app/common';
import { UsersFormsService } from './services/forms/usersForms.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersFormsService: UsersFormsService,
  ) {}

  @Patch()
  async updateUserProfile(@Body() userUpdateDto: UserUpdateDto): Promise<void> {
    return await this.usersFormsService.updateUserProfile(userUpdateDto);
  }

  @Get('/all')
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.getById(id);
  }

  @Get('chat/:id')
  async getByChatId(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.getByChatId(id);
  }
}
