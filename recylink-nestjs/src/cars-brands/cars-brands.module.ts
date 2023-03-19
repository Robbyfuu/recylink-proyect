import { Module } from '@nestjs/common';
import { CarsBrandsService } from './cars-brands.service';
import { CarsBrandsResolver } from './cars-brands.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsBrand, CarsBrandSchema } from './entities/cars-brand.entity';

@Module({
  providers: [CarsBrandsResolver, CarsBrandsService],
  imports: [
    MongooseModule.forFeature([
      { name: CarsBrand.name, schema: CarsBrandSchema },
    ]),
  ],
})
export class CarsBrandsModule {}
