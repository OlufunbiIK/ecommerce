/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dto/create-many-users-dto.dto';

@Injectable()
export class CreateManyUserProvider {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  public async createManyUsers(createManyUserDto: CreateManyUsersDto) {
    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();
    // Connect QueryRunner to data source
    await queryRunner.connect();
    // Start a new transaction
    await queryRunner.startTransaction();
    const newUsers: User[] = [];
    try {
      for (const user of createManyUserDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
        // When successful commit
        await queryRunner.commitTransaction();
      }
    } catch (error) {
      console.error('Error creating users:', error);
      // If unsuccessful roll back
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred while creating users',
          error: error.message || 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      // Release the QueryRunner connection
      await queryRunner.release();
    }
    return newUsers;
  }
}
