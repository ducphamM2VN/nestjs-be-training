import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/shared/models/response.model';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get('/:id')
    public getById(@Param('id') id: string) : Promise<IResponse> {
        console.log(id)
        return this.userService.getById(id)
    }

    @Get('/')
    public getAll(): Promise<IResponse> {
        return this.userService.getAll()
    }

    @Post('')
    public post(@Body() body: User): Promise<IResponse> {
        return this.userService.create(body)
    }

    @Put('')
    public update(@Body() body: User): Promise<IResponse> {
        return this.userService.update(body)
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<IResponse> {
        return this.userService.delete(id)
    }
}
