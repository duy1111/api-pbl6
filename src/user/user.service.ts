import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
import { ErrorMessages, PlainToInstance } from '../helpers/helpers';
import { UserModel } from './model/user.model';

@Injectable({})
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async currentUser(user: any): Promise<Partial<UserModel>> {
    const User = await this.prismaService.user.findFirst({
      where: {
        id: +user.sub,
      },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
      },
    });
    return User;
  }

  async updateUser(username: string, dto: UpdateUserDto): Promise<UserModel> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new NotFoundException(ErrorMessages.USER.USER_NOT_FOUND);
    }
    const updatedUser = await this.prismaService.user.update({
      where: {
        username: username,
      },
      data: {
        ...dto,
      },
    });

    return PlainToInstance(UserModel, updatedUser);
  }
}
