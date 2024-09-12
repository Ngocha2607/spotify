import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}
    @Post('signup')
    signup(
        @Body()
        userDto: UserCreateDto
    ): Promise<User> {

        return this.userService.create(userDto)
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto
    ) : Promise<User> {

        return this.authService.login(loginDto)
    }

}
