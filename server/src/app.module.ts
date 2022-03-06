import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruitersModule } from './recruiters/recruiters.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig]}),
    CommonModule,
    JobsModule,
    RecruitersModule,
    UsersModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI') || `mongodb+srv://${config.get('DB_USERNAME')}:${config.get('DB_PASSWORD')}@${config.get('DB_CLUSTER')}.mongodb.net/${config.get('DB_NAME')}?retryWrites=true`
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
