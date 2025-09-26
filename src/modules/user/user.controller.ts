import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('update')
  update(@Body() updateUserDto: UpdateUserDto, @Body('id') id: number) {
    return this.userService.update(id, updateUserDto);
  }

  @Post('transfer')
  transfer(
    @Body('fromId') fromId: number,
    @Body('toId') toId: number,
    @Body('amount') amount: number,
  ) {
    return this.userService.transfer(fromId, toId, amount);
  }
}
