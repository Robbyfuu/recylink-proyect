import React, {lazy} from 'react';
import { Navigate } from "react-router-dom";

const Login = lazy(() => import("../pages/Auth/SignIn").then(module => ({default: module.SignIn})));

const Register = lazy(() => import("../pages/Auth/SignUp").then(module => ({default: module.SignUp})));


const HomePage = lazy(() => import("../pages/Home-Page/HomePage").then(module => ({default: module.HomePage})));
 

const authProtectedRoutes =[
    //dashboard
    { path: '/home', component: HomePage },
    
    //redirect
    { path: "/", exact: true, component: () => <Navigate to="/home" /> },
]

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },

]

export { authProtectedRoutes, publicRoutes }