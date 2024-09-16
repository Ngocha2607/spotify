import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { PayloadType } from 'src/types/payload.type';
import * as speakeasy from 'speakeasy';
import { Enable2FAType } from 'src/types/auth-types';
import { UpdateResult } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistsService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDto);
    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (passwordMatched) {
      delete user.password;
      const payload: PayloadType = {
        email: user.email,
        userId: user.id,
      };
      const artist = await this.artistService.findArtist(user.id);
      if (artist) {
        payload.artistId = artist.id;
      }
      return { accessToken: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException('Password or username is incorrect!');
    }
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findById(userId);
    if (user.enable2FA) {
      return { secret: user.twoFASecret };
    }
    const secret = speakeasy.generateSecret();
    console.log(secret);
    user.twoFASecret = secret.base32;
    await this.userService.updateSecretKey(user.id, user.twoFASecret);

    return { secret: user.twoFASecret };
  }
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userService.disable2FA(userId);
  }
}
