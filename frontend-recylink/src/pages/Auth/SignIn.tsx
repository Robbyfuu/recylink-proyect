import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mutations } from "../../api/querys";
import { graphqlAxios } from "../../api/graphql-axios";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";
export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    graphqlAxios
      .post("", {
        query: mutations.loginUser,
        variables: {
          loginInput: {
            email: email,
            password: password,
          },
        },
      })
      .then((res) => {
        localStorage.setItem("authUser", JSON.stringify(res.data.data.login));
        openNotificationWithIcon(
          "success",
          "Inicio de sesion correcto",
          "Bienvenido"
        );
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Inicio de sesion incorrecto",
          "Verifique sus credenciales"
        );
      });
  };

  return (
    <React.Fragment>
      {contextHolder}
      <div className="container-login">
        <div className="login-container">
          <label htmlFor="item-1" className="item">
            {" "}
            Sign In{" "}
          </label>{" "}
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <input
                  type="text"
                  placeholder="email"
                  id="user"
                  className="input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="group">
                <input
                  type="password"
                  placeholder="password"
                  id="pass"
                  className="input"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="group">
                <input
                  className="button"
                  value="Sign In"
                  onClick={(e) => handleSubmit(e)}
                />
              </div>
              <div className="hr"></div>
              <div className="footer">
                <Link to={"/register"} className="link">
                  Crear Cuenta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
