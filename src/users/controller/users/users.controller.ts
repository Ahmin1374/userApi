import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from '../../service/users/users.service';
import { UsersModel } from 'src/models/users';

@Controller('v1/users')
export class UsersController {
    
    constructor(private usersService:UsersService){}

    @Get()
    async getAllUsers():Promise<UsersModel[]>{
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    async getUserByID(@Param('id', ParseIntPipe) id: number):Promise<UsersModel>{
        const result = this.usersService.getUserByID(id);        
        return result;
    }
}
