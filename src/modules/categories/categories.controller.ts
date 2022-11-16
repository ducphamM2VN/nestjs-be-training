import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/shared/models/response.model';
import { Category } from './categories.model';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly userService: CategoriesService) { }

    @Get('/:id')
    public getById(@Param('id') id: string) : Promise<IResponse> {
        return this.userService.getById(id)
    }

    @Get('/')
    public getAll(): Promise<IResponse> {
        return this.userService.getAll()
    }

    @Post('')
    public post(@Body() body: Category): Promise<IResponse> {
        return this.userService.create(body)
    }

    @Put('')
    public update(@Body() body: Category): Promise<IResponse> {
        return this.userService.update(body)
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<IResponse> {
        return this.userService.delete(id)
    }
}
