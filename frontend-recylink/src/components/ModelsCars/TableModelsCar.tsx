import { Button, Col, Modal, notification, Row, Space, Table } from "antd";
import React from "react";
import {
  deleteBrandCar,
  deleteModelCar,
  getBrandCars,
  getModelCars,
} from "../../api/actions.api";
import {
  ICarsBrand,
  IConfigHeader,
  IDataTableCarsBrand,
  IModelCar,
} from "../../interfaces";

interface ITableModelsCar {
  models: IModelCar[];
  setKeyModel: (key: string) => void;
  setIdCarsModel: (id: string) => void;
  setModelName: (name: string) => void;
  config: IConfigHeader;
  setModels: (models: []) => void;
  setBrandId: (id: string) => void;
}
type NotificationType = "success" | "info" | "warning" | "error";
export const TableModelsCar: React.FC<ITableModelsCar> = ({
  models,
  setKeyModel,
  setIdCarsModel,
  setModelName,
  config,
  setModels,
  setBrandId
}) => {
  const { confirm } = Modal;
  const [api, contextHolder] = notification.useNotification();

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

  const showDeleteConfirm = (name: string, key: string) => {
    confirm({
      title: `Estas seguro de eliminar el Modelo ${name}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setIdCarsModel("");
        deleteModelCar(key, config).then((res) => {
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
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columnsBrandCars = [
    {
      title: "Modelo",
      dataIndex: "nameModel",
      key: "name",
    },
    {
      title: "Marca",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setKeyModel("3");
              setIdCarsModel(record.key);
              setModelName(record.nameModel);
              setBrandId(record.brandId);
            }}
          >
            Update
          </Button>
          <Button
            type="primary"
            onClick={(e) => {
              setIdCarsModel(record.key);
              showDeleteConfirm(record.nameModel, record.key);
            }}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <React.Fragment>
      {contextHolder}
      <div className="container">
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <h1>Lista de Modelos</h1>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={models} columns={columnsBrandCars} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
