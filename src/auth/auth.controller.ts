import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserCreateDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtArtistGuard } from 'src/jwt-guard/jwt-artist.guard';
import { Enable2FAType } from 'src/types/auth-types';
import { JwtAuthGuard } from 'src/jwt-guard/jwt-auth.guard';
import { UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  signup(
    @Body()
    userDto: UserCreateDto,
  ): Promise<User> {
    return this.userService.create(userDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Post('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(@Request() req): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.userId);
  }
  @Get('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(@Request() req): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }
}
