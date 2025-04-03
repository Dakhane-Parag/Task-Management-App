import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
  
    if (token) {
      axios.get("http://localhost:5000/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("AuthToken");
        });
    }
  }, []);
  

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
  
      if (res.status === 200) {
        localStorage.setItem("AuthToken", res.data.token);
        setUser(res.data.user);
        return true;
      } else {
        alert(res.data.message);
        return false;
      }
    } catch (error) {
      console.error("Login error", error);
      return false;
    }
  };
  

  const logout = () => {
    localStorage.removeItem("AuthToken");
    setUser(null);
    navigate("/"); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
