import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
     firstName: string;

    @IsString()
    @IsNotEmpty()
     lastName: string;
    
    @IsString()
    @IsNotEmpty()
     email: string;
    
    @IsString()
    @IsNotEmpty()
     password: string;
}