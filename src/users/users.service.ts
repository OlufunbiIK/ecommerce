/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserProvider } from './provider/create-user.provider';
import { PaginationQueryDto } from './dto/pageQueryDto';
import { FindOneByEmailProvider } from './provider/find-one-by-email';
import { CreateManyUsersDto } from './dto/create-many-users-dto.dto';
import { CreateManyUserProvider } from './provider/createmanyuser.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
    private readonly dataSource: DataSource,
    private readonly createManyUsersProvider: CreateManyUserProvider,
  ) {}
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public async findUsersByEmail(email: string) {
    return await this.findOneByEmailProvider.findUsersByEmail(email);
  }
  public async createManyUsers(createManyUserDto: CreateManyUsersDto) {
    return await this.createManyUsersProvider.createManyUsers(
      createManyUserDto,
    );
  }
  public async getPaginatedUsers(paginationQueryDto: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQueryDto;
    const offset = (page - 1) * limit;
    const [users, totalItems] = await this.userRepository.findAndCount({
      skip: offset,
      take: limit,
    });
    const totalPages = Math.ceil(totalItems / limit);
    return {
      data: users,
      meta: {
        totalItems,
        currentPage: page,
        totalPages,
        itemsPerPage: limit,
      },
    };
  }
  public findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
