import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p>Loading...</p>; 
  if (!user) return <Navigate to="/login" />;

  const token = localStorage.getItem("Authtoken"); 
  return token ? <Navigate to="/dashboard" /> : children;

};

export default PrivateRoute;
