import {
  UseGuards,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

import { AuthService } from './auth.service';
import { GetExecutionContext } from './decorators/get-context.decorator';
import { RegisterInput, LoginInput } from './dto/inputs/';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }
  @Mutation(() => String, { name: 'logout' })
  async logout() {
    return this.authService.logout();
  }
  @Mutation(() => AuthResponse, { name: 'register' })
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<AuthResponse> {
    return this.authService.register(registerInput);
  }
  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(
    @GetExecutionContext() context: ExecutionContext,
  ): AuthResponse {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;
    if (!user) {
      throw new InternalServerErrorException(
        `No user inside the request - make sure that we used the AuthGuard`,
      );
    }
    return this.authService.revalidateToken(user);
  }
}
