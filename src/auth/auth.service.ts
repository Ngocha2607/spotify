import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs";
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entity/user.entity';
@Injectable()
export class AuthService {

    constructor(private userService: UsersService) {}


    async login(loginDto: LoginDto): Promise<User> {
        const user = await this.userService.findOne(loginDto);
        const passwordMatched = await bcrypt.compare(loginDto.password, user.password);
        if(passwordMatched) {
            delete user.password;
            return user;
        }
         else {
            throw new UnauthorizedException('Password or username is incorrect!');
         }
    }
}
