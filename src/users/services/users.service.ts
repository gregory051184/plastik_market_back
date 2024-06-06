import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity, UserDto, UserEntity } from '@app/common';
import { UserUpdateDto } from '@app/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(CartEntity)
    private readonly cartsRepository: Repository<CartEntity>, //private readonly cartService: CartService
  ) {}

  async create(userDto: UserDto): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.create(userDto);
    await this.usersRepository.save(user);

    const cart: CartEntity = await this.cartsRepository.create({ user: user });
    await this.cartsRepository.save(cart);
    return user;
  }

  async update(userUpdateDto: UserUpdateDto): Promise<void> {
    await this.usersRepository.update(userUpdateDto.id, { ...userUpdateDto });
  }

  async getAll(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this.usersRepository.find();
    return users;
  }

  async getById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: id },
    });
    return user;
  }

  async getByChatId(chatId: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { chatId: chatId },
    });
    return user;
  }

  async getAllAdmins(): Promise<UserEntity[]> {
    const admins: UserEntity[] = await this.usersRepository.find({
      where: { admin: true },
    });
    return admins;
  }

  async getByFirstName(firstName: string): Promise<UserEntity[]> {
    const user: UserEntity[] = await this.usersRepository.find({
      where: { firstName: firstName },
    });
    return user;
  }

  async getByUsername(username: string): Promise<UserEntity[]> {
    const user: UserEntity[] = await this.usersRepository.find({
      where: { username: username },
    });
    return user;
  }

  async createOrBanedAdmin(userId: number, admin: boolean): Promise<void> {
    await this.usersRepository.update(userId, { admin: admin });
  }

  async bannedUser(userId: number, ban: boolean): Promise<void> {
    await this.usersRepository.update(userId, { banned: ban });
  }
}
