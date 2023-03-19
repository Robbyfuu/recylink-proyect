import { gql, useQuery } from "@apollo/client";
import { notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { graphqlAxios } from "../../api/graphql-axios";
import { mutations, querys } from "../../api/querys";

type NotificationType = "success" | "info" | "warning" | "error";
export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({});
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
        query: mutations.registerUser,
        variables: {
          registerInput: {
            fullName: fullName,
            email: email,
            password: password,
          },
        },
      })
      .then((res) => {
        setResponse(res.data.data.register);
        localStorage.setItem('authUser', JSON.stringify(res.data.data.register));
        openNotificationWithIcon(
          "success",
          "Registro correcto",
          "Bienvenido"
        );
        navigate("/home")

      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Registro incorrecto",
          "Verifique sus credenciales"
        );
      });
  };

  return (
    <React.Fragment>
      {contextHolder}
    <div className="container-login">
      <div className="login-container">
        <input type="radio" id="item-2" name="item" className="sign-up" />{" "}
        <label htmlFor="item-2" className="item">
          {" "}
          Sign Up{" "}
        </label>{" "}
        <div className="login-form">
          <div className="sign-up-htm">
            <div className="group">
              <input
                type="text"
                placeholder="username"
                id="user"
                className="input"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </div>
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
                value="Sign Up"
                onClick={(e) => handleSubmit(e)}
              />
            </div>
            <div className="hr"></div>
            <div className="footer">
              <Link to={"/login"} className="link">
                Ya tienes cuenta?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};
