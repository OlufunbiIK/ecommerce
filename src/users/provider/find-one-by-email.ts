/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //find the user in the database
  //throw an error if the user is not found

  public async findUsersByEmail(email: string) {
    let user: User | undefined;
    try {
      user = await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException('Error fetching User', {
        description: 'There was an error fetching the User',
      });
    }
    if (!user) {
      throw new UnauthorizedException('This User does not exist');
    }
    return user;
  }
}
