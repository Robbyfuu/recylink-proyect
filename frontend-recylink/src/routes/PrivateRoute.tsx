import { Outlet,Navigate } from "react-router-dom";

interface PrivateRouteProps {
  isAuthProtected: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({  isAuthProtected }) => {
    const authUser = localStorage.getItem("authUser");
    return isAuthProtected && authUser ? <Outlet/> : <Navigate to="/login" />;
  }