import React, { Suspense } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

// routes
import { authProtectedRoutes, publicRoutes } from "./routes";
import { PrivateRoute } from "./routes/PrivateRoute";



function App() {

  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {" "}
                <route.component />{" "}
              </Suspense>
            }
          />
        ))}
        <Route element={<PrivateRoute isAuthProtected={true} />}>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {" "}
                  <route.component />{" "}
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
