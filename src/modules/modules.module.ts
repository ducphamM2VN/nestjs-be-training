import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [
    FirebaseService, 
    UsersService
  ],
})
export class TreeModule {}
