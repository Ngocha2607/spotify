import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
     email;

    @IsString()
    @IsNotEmpty()
    password;
}