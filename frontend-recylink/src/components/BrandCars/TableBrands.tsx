import { Button, Col, Modal, notification, Row, Space, Table } from "antd";
import React from "react";
import { deleteBrandCar, getBrandCars } from "../../api/actions.api";
import { ICarsBrand, IDataTableCarsBrand } from "../../interfaces";
import { IConfigHeader } from "../../interfaces/configHeader.interface";

interface PropsTableBrand {
  carsBrand: IDataTableCarsBrand[];
  setKeyBrand: (key: string) => void;
  setIdCarsBrand: (id: string) => void;
  setBrandName: (name: string) => void;
  config: IConfigHeader;
  setCarsBrand: (cars: []) => void;
}
type NotificationType = "success" | "info" | "warning" | "error";
export const TableBrands: React.FC<PropsTableBrand> = ({
  carsBrand,
  setKeyBrand,
  setIdCarsBrand,
  setBrandName,
  config,
  setCarsBrand
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
  const deleteBrand = (key: string) => {
    const response = deleteBrandCar(key, config).then((res) => {
      if (res.data !== null) {
        openNotificationWithIcon(
          "success",
          "Marca Eliminada",
          "La marca se elimino correctamente"
        );
      } else {
        setBrandName("");
        openNotificationWithIcon(
          "error",
          "Error",
          "Ocurrio un error al eliminar la marca"
        );
      }
    });
    setBrandName("");
    return response;
  };
  const showDeleteConfirm = (name: string, key: string) => {
    confirm({
      title: `Estas seguro de eliminar la marca ${name}?`,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setIdCarsBrand("");
        deleteBrand(key).then((res) => {
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
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columnsBrandCars = [
    {
      title: "Nombre",
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
              setKeyBrand("3");
              setIdCarsBrand(record.key);
              setBrandName(record.name);
            }}
          >
            Update
          </Button>
          <Button
            type="primary"
            onClick={(e) => {
              setIdCarsBrand(record.key);
              showDeleteConfirm(record.name, record.key);
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
            <h1>Listar Marcas</h1>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={carsBrand} columns={columnsBrandCars} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
