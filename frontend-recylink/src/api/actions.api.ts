import { AxiosResponse } from 'axios';
import { IConfigHeader } from '../interfaces/configHeader.interface';
import { graphqlAxios } from './graphql-axios';
import { mutations, querys } from './querys';

export const createBrandCar = async (name: string, config:IConfigHeader) : Promise<AxiosResponse>  => {
    const response = await graphqlAxios.post('', {
        query: mutations.createBrandCar,
        variables: {
            createCarsBrandInput: {
                name,
            },
        },
    }, config);
    
    return response.data;
};
export const updateBrandCar = async (id: string, name: string, config:IConfigHeader) : Promise<AxiosResponse>  => {
    const response = await graphqlAxios.post('', {
        query: mutations.updateBrandCar,
        variables: {
            updateCarsBrandInput: {
                _id:id,
                name,
            },
        },
    }, config);
    
    return response.data.data;
}
export const deleteBrandCar = async (id: string, config:IConfigHeader) : Promise<AxiosResponse>  => {
    const response = await graphqlAxios.post('', {
        query: mutations.deleteBrandCar,
        variables: {
            "carsBrandId": id
        },
    }, config);
    
    return response.data;
}
export const getBrandCars = async (config:IConfigHeader) : Promise<AxiosResponse>  => {
    const response = await graphqlAxios.post('', {
        query: querys.getCarsBrands,
    }, config);
    
    return response.data;
}
export const createModelCar= async (name: string, brand: string, config:IConfigHeader) : Promise<AxiosResponse>  => {
    const response = await graphqlAxios.post('', {
        query: mutations.createModelCar,
        variables: {
            "createModelsCarInput": {
                 nameModel:name,
                brand
              }
        },
    }, config);
    
    return response.data;
}
export const updateModelCar = async (id: string, name: string, brand: string, config:IConfigHeader) : Promise<AxiosResponse>  => {
    const response = await graphqlAxios.post('', {
        query: mutations.updateModelCar,
        variables: {
            "updateModelsCarInput": {
                _id:id,
                nameModel:name,
                brand
              }
        },
    }, config);
    
    return response.data;
}
export const deleteModelCar = async (id: string, config:IConfigHeader) : Promise<AxiosResponse>  => {
    const response = await graphqlAxios.post('', {
        query: mutations.deleteModelCar,
        variables: {
            "removeModelsCarId": id
        },
    }, config);
    
    return response.data;
}
export const getModelCars = async (config:IConfigHeader) : Promise<AxiosResponse>  => {
    const response = await graphqlAxios.post('', {
        query: querys.getCarsModels,
    }, config);
    
    return response.data;
}