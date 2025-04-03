import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
        <p className="text-center mb-4">Welcome, {user?.username}!</p>

        {user?.role === "admin" ? (
          <>
            <h2 className="text-lg font-semibold mb-2">Admin Panel</h2>
            <p>Here, you can assign tasks to users.</p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2">User Panel</h2>
            <p>View and manage your tasks here.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
