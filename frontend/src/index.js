import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from  "./context/AuthContext" // Ensure correct import
import App from "./App";

ReactDOM.render(
  <BrowserRouter> {/* 🔥 This ensures useNavigate() works! */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
