import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
      <Link to="/" className="text-2xl font-bold text-white hover:text-blue-300 transition">
        TaskFlow
      </Link>
      <div>
        {user ? (
          <>
            <Link to="/dashboard" className="mx-4 hover:text-gray-300 transition">Dashboard</Link>
            <button 
              onClick={logout} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="mx-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="mx-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
