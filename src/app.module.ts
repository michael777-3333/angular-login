import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'michael_777',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    TypeOrmModule.forFeature([]),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
