export const querys = {
  getCarsBrands: `{
        carsBrands{
            _id
            name
            }
    }`,
  getCarsBrand: `
    query($id: ID!){
        carsBrand(id: $id){
            _id
            name
            }
        }`,
  getCarsModel: `
    query($id: ID!){
        modelsCar(id: $id){
            _id
            name
            }
            }`,
  getCarsModels: `
  query ModelsCars {
    modelsCars {
      _id
      nameModel
      brand {
        _id
        name
      }
    }
  }
    `,
};
export const mutations = {
    registerUser:`
        mutation Register($registerInput: RegisterInput!) {
            register(registerInput: $registerInput) {
                token
                user {
                    _id
                    fullName
                    email
                    password
                    isActive
                }
            }
        }`,

    loginUser:`
        mutation Login($loginInput: LoginInput!) {
            login(loginInput: $loginInput) {
              token
              user {
                _id
                fullName
                email
                password
                isActive
              }
            }
          }`,
    createBrandCar:`
    mutation CreateCarsBrand($createCarsBrandInput: CreateCarsBrandInput!) {
        createCarsBrand(createCarsBrandInput: $createCarsBrandInput) {
          _id
          name
        }
      }`,

    createModelCar:`
    mutation CreateModelsCar($createModelsCarInput: CreateModelsCarInput!) {
        createModelsCar(createModelsCarInput: $createModelsCarInput) {
          _id
          nameModel
          brand {
            _id
            name
          }
        }
      }`,
    updateBrandCar:`
    mutation UpdateCarsBrand($updateCarsBrandInput: UpdateCarsBrandInput!) {
        updateCarsBrand(updateCarsBrandInput: $updateCarsBrandInput) {
          _id
          name
        }
      }`,
    updateModelCar:`
    mutation UpdateModelsCar($updateModelsCarInput: UpdateModelsCarInput!) {
        updateModelsCar(updateModelsCarInput: $updateModelsCarInput) {
          _id
          nameModel
          brand {
            _id
            name
          }
        }
      }`,
    deleteBrandCar:`
    mutation RemoveCarsBrand($carsBrandId: ID!) {
        removeCarsBrand(id: $carsBrandId) {
          _id
          name
        }
      }`,
    deleteModelCar:`
    mutation RemoveModelsCar($removeModelsCarId: ID!) {
        removeModelsCar(id: $removeModelsCarId) {
          _id
          nameModel
          brand {
            name
          }
        }
      }`,
};
