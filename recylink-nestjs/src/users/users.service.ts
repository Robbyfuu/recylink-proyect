import { Injectable, Logger } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { RegisterInput } from '../auth/dto/inputs/register.input';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('UsersService');
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
  ) {}
  async create(registerInput: RegisterInput): Promise<User> {
    try {
      const createdUser = this.usersModel.create({
        ...registerInput,
        password: bcrypt.hashSync(registerInput.password, 10),
      });
      return await (await createdUser).save();
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersModel.findOne({ email });
      if (!user) {
        throw new BadRequestException(`${email} not found`);
      }
      return user;
    } catch (error) {
      this.handleDBError(error);
    }
  }
  async findOneById(id: string): Promise<User> {
    try {
      const user = this.usersModel.findById(id);
      if (!user) {
        throw new BadRequestException(`${id} not found`);
      }
      return await user;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // async block(id: string): Promise<User> {
  //   throw new Error('Method not implemented.');
  // }
  private handleDBError(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(error.message.split(':')[2]);
    }
    this.logger.error(error.message);
    throw new InternalServerErrorException('Please check server logs');
  }
}
