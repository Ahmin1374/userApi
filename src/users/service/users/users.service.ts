import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as JSONDATA from '../../../users.json';
import { UsersModel } from '../../../models/users';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
   private data: any = JSONDATA;
   

    async getAllUsers():Promise<UsersModel[]>{
        
        for (const user of this.data) {
            const u = plainToClass(UsersModel, user)
            const errors = await validate(u);
            if (errors.length > 0) {
                throw new BadRequestException("Wrong Data Type");
            }
        }
        
        return this.data;
    }

    async getUserByID(id:number):Promise<UsersModel>{
        const result = this.data.find(user => user.id == id);
        if(!result){
            throw new NotFoundException('User does not exist');
         } 
         
        return result;
    }
}
