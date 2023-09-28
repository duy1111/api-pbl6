import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { user } from '@prisma/client';
import { APISummaries, ErrorMessages } from '../helpers/helpers';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserModel } from './model/user.model';
import { UpdateUserDto } from './dto';
type UserType = Pick<user, 'id' | 'username' | 'email'>;
@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: APISummaries.USER })
  @ApiOkResponse({ type: UserModel })
  @ApiBearerAuth()
  @Get('currentUser')
  @UseGuards(UserGuard)
  currentUser(@GetUser() user: user) {
    console.log(user);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: APISummaries.USER })
  @ApiOkResponse({ type: UserModel })
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Put(':username')
  updateUser(
    @Param('username') username: string,
    @Body() dto: UpdateUserDto,
    @GetUser() user: UserType,
  ): Promise<UserModel> {
    console.log(username);
    if (!user) {
      throw new BadRequestException(ErrorMessages.USER.USER_INVALID);
    }
    return this.userService.updateUser(username, dto);
  }
}
