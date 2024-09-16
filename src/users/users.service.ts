import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

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
    return userSaved;
  }

  async findOne(data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('User not found!');
    } else {
      return user;
    }
  }
  async updateSecretKey(
    userId: number,
    secretKey: string,
  ): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        twoFASecret: secretKey,
        enable2FA: true,
      },
    );
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        enable2FA: false,
        twoFASecret: null,
      },
    );
  }
}
