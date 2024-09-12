import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/create-user.dto';
import * as bcrypt from "bcryptjs";

@Injectable({
    scope: Scope.TRANSIENT,
  })
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async create(userDto: UserCreateDto): Promise<User> {
        const user = new User();
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userDto.password, salt);
        user.password = hashedPassword;
        user.firstName = userDto.firstName;
        user.lastName = userDto.lastName;
        user.email = userDto.email;
        const userSaved = await this.userRepository.save(user);
        delete userSaved.password;
        return userSaved
    }

    async findOne(data: Partial<User>): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: data.email });
        if(!user) {
            throw new UnauthorizedException('User not found!');
        } else { 
            return user
        }
    }
}
