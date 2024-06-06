import { Injectable } from '@nestjs/common';
import { UserEntity, UserUpdateDto } from '@app/common';
import { UsersService } from '../users.service';

@Injectable()
export class UsersFormsService {
  constructor(private readonly usersService: UsersService) {}

  async updateUserProfile(userUpdateDto: UserUpdateDto): Promise<void> {
    await this.usersService.update(userUpdateDto);
  }

  async createOrBanedAdminForm(
    bot: any,
    chatId: any,
    userId: number,
  ): Promise<void> {
    try {
      const user: UserEntity = await this.usersService.getById(userId);
      if (user.admin) {
        const user: any = await this.usersService.createOrBanedAdmin(
          userId,
          true,
        );
        return bot.sendMessage(
          chatId,
          `Пользователю ${user.firstName} присвоен статус админа`,
        );
      }
      if (!user.admin) {
        const user: any = await this.usersService.createOrBanedAdmin(
          userId,
          false,
        );
        return bot.sendMessage(
          chatId,
          `Пользователь ${user.firstName} лишён статуса админа`,
        );
      }
    } catch (error) {}
  }

  async bannedUserForm(
    bot: any,
    chatId: string,
    userId: number,
  ): Promise<void> {
    try {
      const userTo: UserEntity = await this.usersService.getById(userId);
      if (!userTo.banned) {
        const user: any = await this.usersService.bannedUser(userId, true);
      }
      if (userTo.banned) {
        const user: any = await this.usersService.bannedUser(userId, false);
      }
    } catch (error) {}
  }
}
