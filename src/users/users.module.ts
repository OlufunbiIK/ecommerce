/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './provider/create-user.provider';
import { FindOneByEmailProvider } from './provider/find-one-by-email';
import { CreateManyUserProvider } from './provider/createmanyuser.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserProvider,
    FindOneByEmailProvider,
    CreateManyUserProvider,
  ],
  exports: [UsersService, FindOneByEmailProvider], // Make the UsersService available for other modules to import and use.  // This is a good practice for modularity and reusability.  // This line will allow other modules to use the UsersService by importing UsersModule and using the provided UsersService.  // It's also a good practice to export the UsersService so that it can be used in other parts of your application.  // This allows other parts of your application to easily import and
})
export class UsersModule {}
