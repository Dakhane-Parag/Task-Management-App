import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // ✅ Redirect if not logged in
    }

    // Dummy tasks (Replace with API call)
    setTasks([
      { id: 1, title: "Finish UI design", status: "In Progress" },
      { id: 2, title: "Fix authentication bug", status: "Pending" },
      { id: 3, title: "Write documentation", status: "Completed" },
    ]);
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {user?.name || "User"} 👋</h1>
        <button 
          onClick={() => { 
            logout(); 
            navigate("/login"); // ✅ Navigate to login on logout
          }} 
          className="bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl mt-4">Your Tasks</h2>
      <div className="mt-4 space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className={`text-sm ${task.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>
                {task.status}
              </p>
            </div>
          ))
        ) : (
          <p>No tasks assigned yet.</p>
        )}
      </div>
    </div>
  );
}
