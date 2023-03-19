import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateModelsCarInput, UpdateModelsCarInput } from './dto/inputs/';

import { ModelsCar } from './entities/models-car.entity';

@Injectable()
export class ModelsCarsService {
  constructor(
    @InjectModel(ModelsCar.name)
    private readonly modelsCarModel: Model<ModelsCar>,
  ) {}
  async create(createModelsCarInput: CreateModelsCarInput): Promise<ModelsCar> {
    const createdModelsCar = await this.modelsCarModel.create(
      createModelsCarInput,
    );
    return createdModelsCar.populate('brand');
  }

  async findAll(): Promise<ModelsCar[]> {
    const modelsCars = await this.modelsCarModel.find().populate('brand');
    if (!modelsCars) throw new Error('No hay modelos de autos!');
    return modelsCars;
  }

  async findOne(id: string): Promise<ModelsCar> {
    const modelsCar = await this.modelsCarModel.findById(id).populate('brand');
    if (!modelsCar) throw new Error('Modelo de auto no encontrado!');
    return modelsCar;
  }

  async update(
    id: string,
    updateModelsCarInput: UpdateModelsCarInput,
  ): Promise<ModelsCar> {
    const updatedModelsCar = await this.modelsCarModel.findByIdAndUpdate(
      id,
      updateModelsCarInput,
      { new: true },
    );
    return updatedModelsCar.populate('brand');
  }

  async remove(id: string): Promise<ModelsCar> {
    const modelCar = await this.findOne(id);
    await modelCar.deleteOne();
    return modelCar;
  }
}
