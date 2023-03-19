import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ModelsCarsService } from './models-cars.service';
import { ModelsCar } from './entities/models-car.entity';
import { CreateModelsCarInput, UpdateModelsCarInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => ModelsCar)
export class ModelsCarsResolver {
  constructor(private readonly modelsCarsService: ModelsCarsService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ModelsCar)
  async createModelsCar(
    @Args('createModelsCarInput') createModelsCarInput: CreateModelsCarInput,
  ): Promise<ModelsCar> {
    return this.modelsCarsService.create(createModelsCarInput);
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [ModelsCar], { name: 'modelsCars' })
  async findAll(): Promise<ModelsCar[]> {
    return this.modelsCarsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => ModelsCar, { name: 'modelsCar' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<ModelsCar> {
    return this.modelsCarsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ModelsCar)
  updateModelsCar(
    @Args('updateModelsCarInput') updateModelsCarInput: UpdateModelsCarInput,
  ): Promise<ModelsCar> {
    return this.modelsCarsService.update(
      updateModelsCarInput._id,
      updateModelsCarInput,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ModelsCar)
  removeModelsCar(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ModelsCar> {
    return this.modelsCarsService.remove(id);
  }
}
