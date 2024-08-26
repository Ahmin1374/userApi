import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UsersModel{
    @IsNotEmpty()
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;
}