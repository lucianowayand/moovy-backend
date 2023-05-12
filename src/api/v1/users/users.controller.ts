import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

@Controller('/api/v1/users')
export class UsersController {
    
    constructor(private usersService: UsersService) {}

    @Get(':id')
    get(@Param('id') id: number) {
        return this.usersService.findOne(id);
    }
    
    @Post()
    create(@Body() user: UserEntity) {
        return this.usersService.create(user);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() user: UserEntity) {
        return this.usersService.update(id, user);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.usersService.delete(id);
    }
}
