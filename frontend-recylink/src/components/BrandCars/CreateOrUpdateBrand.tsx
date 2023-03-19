import { Button, Col, Input, notification, Row } from 'antd'
import React, {useState} from 'react'
import { createBrandCar, updateBrandCar } from '../../api/actions.api';
import { IConfigHeader } from '../../interfaces';

interface ICreateBrand {
    keyTab: string;
    setIdCarsBrand: (id: string) => void;
    idCarsBrand: string;
    config: IConfigHeader;
    brandName: string;
    setBrandName: (name: string) => void;
    
}
type NotificationType = "success" | "info" | "warning" | "error";

export const CreateOrUpdateBrand:React.FC<ICreateBrand>  = ({keyTab,config,idCarsBrand,setIdCarsBrand,brandName,setBrandName}) => {
    
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

    const createBrand = (e?: any):void => {
        e.preventDefault();
        e.stopPropagation();
    
        createBrandCar(brandName, config).then((res) => {
          if (res.data !== null) {
            openNotificationWithIcon(
              "success",
              "Marca Creada",
              "La marca se creo correctamente"
            );
          } else {
            setBrandName("");
            openNotificationWithIcon(
              "error",
              "Error",
              "Ocurrio un error al crear la marca"
            );
          }
        });
        setBrandName("");
      };
      const updateBrand = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        updateBrandCar(idCarsBrand, brandName, config).then((res) => {
          if (res.data !== null) {
            openNotificationWithIcon(
              "success",
              "Marca Actualizada",
              "La marca se actualizo correctamente"
            );
          } else {
            setBrandName("");
            openNotificationWithIcon(
              "error",
              "Error",
              "Ocurrio un error al actualizar la marca"
            );
          }
        });
        setBrandName("");
        setIdCarsBrand("");
      };
  return (
    <React.Fragment>
        {contextHolder}
        <div className="container">
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <h1>{keyTab=== '1'? 'Crear Marca':'Actualizar Marca'}</h1>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col span={12}>
                    <label>Nombre</label>
                  </Col>
                  <Col span={12}>
                    <Input
                      placeholder="Ingrese Marca"
                      onChange={(e) => setBrandName(e.target.value)}
                      value={brandName}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Button
                      type="primary"
                      style={{ maxWidth: "300px" }}
                      className="mt-4"
                      onClick={ keyTab ==='1'? (e) => createBrand(e): (e) => updateBrand(e)  }
                      disabled={keyTab === '3'? idCarsBrand === "" ? true : false : false}
                    >
                      {keyTab ==='1'? 'Crear':'Actualizar'}
                    </Button>
                  </Col>
                </Row>
              </div>
    </React.Fragment>
  )
}
