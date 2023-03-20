import { Button, Col, Input, notification, Row, Select } from "antd";
import React, { useEffect } from "react";
import { ICarsBrand, IConfigHeader } from "../../interfaces";
import { createModelCar, getBrandCars, updateModelCar } from "../../api/actions.api";

interface Props {
  keyTab: string;
  setIdModelCars: (id: string) => void;
  idCarsModel: string;
  config: IConfigHeader;
  modelName: string;
  setModelName: (name: string) => void;
  brandId: string;
  setBrandId: (id: string) => void;
}
interface IBrand {
  label: string;
  value: string;
}
type NotificationType = "success" | "info" | "warning" | "error";
export const CreateOrUpdateModelCar: React.FC<Props> = ({
  config,
  idCarsModel,
  keyTab,
  modelName,
  setIdModelCars,
  setModelName,
  brandId,
  setBrandId,
}) => {
  const brand: IBrand[] = [];
  const [api, contextHolder] = notification.useNotification();
  const [brandCars, setBrandCars] = React.useState(brand);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  useEffect(() => {
    getBrandCars(config).then((res) => {
      if (res.data !== null) {
        const data = res.data.carsBrands.map((item: ICarsBrand) => {
          return {
            label: item.name,
            value: item._id,
          };
        });
        setBrandCars(data);
      }
    });
  }, []);


  const createBrand = (e?: any): void => {
    e.preventDefault();
    e.stopPropagation();
    createModelCar(modelName, brandId, config).then((res) => {
      if (res.data !== null) {
        openNotificationWithIcon(
          "success",
          "Modelo Creado",
          "El modelo se creo correctamente"
        );
      } else {
        openNotificationWithIcon(
          "error",
          "Error",
          "Ocurrio un error al crear el modelo"
        );
      }
    });
    setBrandId("");
    setModelName("");
  };
  const updateBrand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateModelCar( idCarsModel,modelName, brandId, config).then((res) => {
      if (res.data !== null) {
        openNotificationWithIcon(
          "success",
          "Modelo Actualizado",
          "El modelo se actualizo correctamente"
        );
      } else {
        setModelName("");
        openNotificationWithIcon(
          "error",
          "Error",
          "Ocurrio un error al actualizar el modelo"
        );
      }
    });
    setModelName("");
    setIdModelCars("");
    setBrandId("");
  };
  return (
    <React.Fragment>
      {contextHolder}
      <div className="container">
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <h1>{keyTab === "1" ? "Crear Modelo" : "Actualizar Modelo"}</h1>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={6}>
            <label>Nombre</label>
          </Col>
          <Col span={18}>
            <Input
              placeholder="Ingrese Modelo"
              onChange={(e) => setModelName(e.target.value)}
              value={modelName}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col span={6}>
            <label>Marca</label>
          </Col>
          <Col span={18}>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Search to Select"
              onChange={(value) => setBrandId(value)}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={brandCars}
              value={brandId}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Button
              type="primary"
              style={{ maxWidth: "300px" }}
              className="mt-4"
              onClick={
                keyTab === "1" ? (e) => createBrand(e) : (e) => updateBrand(e)
              }
              disabled={
                keyTab === "3" ? (idCarsModel === "" ? true : false) : false
              }
            >
              {keyTab === "1" ? "Crear" : "Actualizar"}
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
