import React, { useEffect, useState } from "react";
import { Button, Tabs } from "antd";
import type { TabsProps } from "antd";
import { getBrandCars, getModelCars } from "../../api/actions.api";
import {
  IAuthUser,
  ICarsBrand,
  IConfigHeader,
  IDataTableCarsBrand,
  IModelCar,
} from "../../interfaces/";
import { CreateOrUpdateBrand, TableBrands } from "../../components/BrandCars/";

import {
  CreateOrUpdateModelCar,
  TableModelsCar,
} from "../../components/ModelsCars";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const [brandName, setBrandName] = useState("");
  const navigate = useNavigate();
  const [carsBrand, setCarsBrand] = useState([]);
  const [keyBrand, setKeyBrand] = useState("1");
  const [idCarsBrand, setIdCarsBrand] = useState("");
  const [models, setModels] = useState([]);
  const [modelName, setModelName] = useState("");
  const [idCarsModel, setIdCarsModel] = useState("");
  const [keyModel, setKeyModel] = useState("1");
  const [brandId, setBrandId] = useState("");
  const authUser: IAuthUser = JSON.parse(localStorage.getItem("authUser")!);
  const { token } = authUser;
  const config: IConfigHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const logout = () => {
    localStorage.removeItem("authUser");
    navigate("/login");
  };
  const operations = (
    <Button type="primary" danger onClick={() => logout()}>
      Cerrar Sesión
    </Button>
  );
  const itemsTabsBrand: TabsProps["items"] = [
    {
      key: "1",
      label: `Crear Marca`,
      children: (
        <CreateOrUpdateBrand
          keyTab={keyBrand}
          setIdCarsBrand={setIdCarsBrand}
          idCarsBrand={idCarsBrand}
          config={config}
          brandName={brandName}
          setBrandName={setBrandName}
        />
      ),
    },
    {
      key: "2",
      label: `Listar Marcas`,
      children: (
        <TableBrands
          carsBrand={carsBrand}
          config={config}
          setBrandName={setBrandName}
          setCarsBrand={setCarsBrand}
          setIdCarsBrand={setIdCarsBrand}
          setKeyBrand={setKeyBrand}
        />
      ),
    },
    {
      key: "3",
      label: `Actualizar Marca`,
      children: (
        <CreateOrUpdateBrand
          keyTab={keyBrand}
          setIdCarsBrand={setIdCarsBrand}
          idCarsBrand={idCarsBrand}
          config={config}
          brandName={brandName}
          setBrandName={setBrandName}
        />
      ),
    },
  ];
  const itemsTabsModel: TabsProps["items"] = [
    {
      key: "1",
      label: `Crear Modelo`,
      children: (
        <CreateOrUpdateModelCar
          keyTab={keyModel}
          setIdModelCars={setIdCarsModel}
          idCarsModel={idCarsModel}
          config={config}
          modelName={modelName}
          setModelName={setModelName}
          brandId={brandId}
          setBrandId={setBrandId}
        />
      ),
    },
    {
      key: "2",
      label: `Listar Modelos`,
      children: (
        <TableModelsCar
          models={models}
          setModels={setModels}
          config={config}
          setIdCarsModel={setIdCarsModel}
          setKeyModel={setKeyModel}
          setModelName={setModelName}
          setBrandId={setBrandId}
        />
      ),
    },
    {
      key: "3",
      label: `Actualizar Modelo`,
      children: (
        <CreateOrUpdateModelCar
          keyTab={keyModel}
          setIdModelCars={setIdCarsModel}
          idCarsModel={idCarsModel}
          config={config}
          modelName={modelName}
          setModelName={setModelName}
          brandId={brandId}
          setBrandId={setBrandId}
        />
      ),
    },
  ];
  const itemsTabsMenu: TabsProps["items"] = [
    {
      key: "1",
      label: `Marca`,
      children: (
        <Tabs
          defaultActiveKey="1"
          centered
          onTabClick={(key) => setKeyBrand(key)}
          activeKey={keyBrand}
          items={itemsTabsBrand}
        />
      ),
    },
    {
      key: "2",
      label: `Modelos`,
      children: (
        <Tabs
          defaultActiveKey="1"
          centered
          activeKey={keyModel}
          onTabClick={(key) => setKeyModel(key)}
          items={itemsTabsModel}
        />
      ),
    },
  ];

  useEffect(() => {
    getBrandCars(config).then((res) => {
      const data: [] = res.data.carsBrands.map((item: ICarsBrand) => {
        const { name, _id } = item;
        const data: IDataTableCarsBrand = {
          key: _id,
          name,
        };
        return data;
      });
      setCarsBrand(data);
    });
  }, [keyBrand, idCarsBrand]);
  useEffect(() => {
    getModelCars(config).then((res) => {
      const data: [] = res.data.modelsCars.map((item: IModelCar) => {
        const { nameModel, _id, brand } = item;
        const { name } = brand;
        const data = {
          key: _id,
          nameModel,
          name,
          brandId: brand._id,
        };
        return data;
      });
      setModels(data);
    });
  }, [keyModel, idCarsModel, keyBrand]);

  return (
    <React.Fragment>
      <Tabs
        defaultActiveKey="1"
        centered
        items={itemsTabsMenu}
        tabBarExtraContent={operations}
      />
    </React.Fragment>
  );
};
