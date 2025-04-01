import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("Authtoken"); 
  return token ? <Navigate to="/dashboard" /> : children;
};

export default PrivateRoute;
