import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig]}),
    CommonModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/rememe')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
