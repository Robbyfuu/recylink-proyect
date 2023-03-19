import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarsBrandInput, UpdateCarsBrandInput } from './dto/inputs';
import { CarsBrand } from './entities/cars-brand.entity';

@Injectable()
export class CarsBrandsService {
  constructor(
    @InjectModel(CarsBrand.name)
    private readonly carsBrandModel: Model<CarsBrand>,
  ) {}
  async create(createCarsBrandInput: CreateCarsBrandInput): Promise<CarsBrand> {
    const createdCarsBrand = await this.carsBrandModel.create(
      createCarsBrandInput,
    );
    return createdCarsBrand;
  }

  async findAll(): Promise<CarsBrand[]> {
    const carsBrands = await this.carsBrandModel.find();
    return carsBrands;
  }

  async findOne(id: string): Promise<CarsBrand> {
    const carsBrand = await this.carsBrandModel.findById(id);
    if (!carsBrand) throw new Error('Marca de auto no encontrada!');
    return carsBrand;
  }

  async update(
    id: string,
    updateCarsBrandInput: UpdateCarsBrandInput,
  ): Promise<CarsBrand> {
    const updatedCarsBrand = await this.carsBrandModel.findByIdAndUpdate(
      id,
      updateCarsBrandInput,
      { new: true },
    );
    return updatedCarsBrand;
  }

  async remove(id: string): Promise<CarsBrand> {
    const carsBrand = await this.findOne(id);
    await carsBrand.deleteOne();
    return carsBrand;
  }
}
