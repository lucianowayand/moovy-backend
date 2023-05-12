import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/v1/users')
export class UsersController {
    
    constructor(private usersService: UsersService) {}

    @Get(':id')
    get(@Param('id') id: number) {
        return this.usersService.get(id);
    }
    
}
