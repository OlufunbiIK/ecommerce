/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { Order } from './order/entities/order.entity';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { CreateUserProvider } from './users/provider/create-user.provider';
import { ChatGateWay } from './chat/chat.gateway';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { CorsInterceptor } from './auth/cors/cors-interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.development'] }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    OrderModule,
    AuthModule,
    TypeOrmModule.forFeature([User, Product, Category, Order, Auth]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_NAME'),
        synchronize: configService.get('POSTGRES_SYNC'), // For development only
        autoLoadEntities: configService.get('DATABASE_LOAD'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CreateUserProvider,
    ChatGateWay,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CorsInterceptor,
    // },
  ],
})
export class AppModule {}
