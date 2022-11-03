import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

// $ nest generate module
// $ nest g mo

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
