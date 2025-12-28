import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:jQxXmvOAXcplyfkRqBaDMaBdLuRIOfsd@postgres.railway.internal:5432/railway',
      host: 'postgres.railway.internal',
      port: 5432,
      username: 'postgres',
      password: 'jQxXmvOAXcplyfkRqBaDMaBdLuRIOfsd',
      database: 'railway',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
