import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
    imports: [ConfigModule],
    controllers: [
        UsersController,
        CategoriesController
    ],
    providers: [
        FirebaseService,
        UsersService,
        CategoriesService
    ],
})
export class TreeModule { }
