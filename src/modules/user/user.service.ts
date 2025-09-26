import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  // 增：新增/创建用户
  async create(createUserDTO: CreateUserDto) {
    // 先检查用户是否存在
    const checkUser = await this.userRepo.findOne({
      where: {
        username: createUserDTO.username,
      },
    });

    if (checkUser) {
      throw new ConflictException('用户已存在');
    }

    const user = this.userRepo.create(createUserDTO);
    return await this.userRepo.save(user);
  }

  // 删：删除用户
  async remove(id: number): Promise<void> {
    const res = await this.userRepo.delete(id);
    if (res.affected === 0) {
      throw new ConflictException('删除失败');
    }
  }

  // 查：分页查所有用户
  async findAll(
    page: number = 1,
    size: number = 10,
  ): Promise<{ list: User[]; total: number }> {
    const [list, total] = await this.userRepo.findAndCount({
      skip: (page - 1) * size, // 跳过前面的页
      take: size, // 每条页数
      order: {
        createAt: 'DESC', // 按创建时间倒序
      },
    });
    return { list, total };
  }

  // 查：查单个用户
  async findOne(id: number): Promise<User> {
    const uer = await this.userRepo.findOne({ where: { id } });
    if (!uer) {
      throw new ConflictException('用户不存在');
    }
    return uer;
  }

  // 改：更新用户
  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new ConflictException('用户不存在');
    }
    const updatedUser = this.userRepo.merge(user, updateUserDto);
    return await this.userRepo.save(updatedUser);
  }

  async transfer(fromId: number, toId: number, amount: number): Promise<void> {
    const fromUser = await this.findOne(fromId);
    const toUser = await this.findOne(toId);

    if (fromUser.balance < amount) {
      throw new ConflictException('余额不足');
    }

    fromUser.balance -= amount;
    toUser.balance += amount;

    await this.userRepo.save(fromUser);
    await this.userRepo.save(toUser);
  }
}
