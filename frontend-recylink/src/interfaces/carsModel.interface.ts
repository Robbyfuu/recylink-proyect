import { ICarsBrand } from "./carsBrand.interface";

export interface IModelCar{
    _id: string;
    nameModel: string;
    brand: ICarsBrand;
}
export interface IDataTableModelCar{
    key: string;
    nameModel: string;
    brand: ICarsBrand;
}