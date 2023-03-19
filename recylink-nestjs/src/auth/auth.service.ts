import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { RegisterInput, LoginInput } from './dto/inputs/';
import { AuthResponse } from './types/auth-response.type';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }
  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;
    const user = await this.usersService.findOneByEmail(email);
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid credentials');
    }
    const token = this.getJwtToken(user.id);
    return { user, token };
  }
  async logout() {
    return 'logout';
  }
  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    const user = await this.usersService.create(registerInput);
    const token = this.getJwtToken(user.id);
    return { user, token };
  }
  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);

    if (!user.isActive) {
      throw new UnauthorizedException(`User is inactive, talk with an admin`);
    }

    delete user.password;

    return user;
  }
  revalidateToken(user: User): AuthResponse {
    console.log('revalidateToken', user);
    const token = this.getJwtToken(user.id);

    return { token, user };
  }
}
