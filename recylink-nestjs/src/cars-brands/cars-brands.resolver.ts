import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CarsBrandsService } from './cars-brands.service';
import { CarsBrand } from './entities/cars-brand.entity';
import { CreateCarsBrandInput, UpdateCarsBrandInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => CarsBrand)
export class CarsBrandsResolver {
  constructor(private readonly carsBrandsService: CarsBrandsService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => CarsBrand)
  async createCarsBrand(
    @Args('createCarsBrandInput') createCarsBrandInput: CreateCarsBrandInput,
  ): Promise<CarsBrand> {
    return this.carsBrandsService.create(createCarsBrandInput);
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [CarsBrand], { name: 'carsBrands' })
  async findAll(): Promise<CarsBrand[]> {
    return this.carsBrandsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => CarsBrand, { name: 'carsBrand' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CarsBrand> {
    return this.carsBrandsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => CarsBrand)
  async updateCarsBrand(
    @Args('updateCarsBrandInput') updateCarsBrandInput: UpdateCarsBrandInput,
  ): Promise<CarsBrand> {
    return this.carsBrandsService.update(
      updateCarsBrandInput._id,
      updateCarsBrandInput,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => CarsBrand)
  removeCarsBrand(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CarsBrand> {
    return this.carsBrandsService.remove(id);
  }
}
