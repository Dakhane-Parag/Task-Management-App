import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [ownTasks, setOwnTasks] = useState([]);
  const [adminActiveTab, setAdminActiveTab] = useState("assign");
  const [userActiveTab, setUserActiveTab] = useState("assignedTasks");

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);


  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setAllTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setAllUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    
    if (user?.role === "admin") {
      fetchUsers();
      fetchTasks();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/tasks", {
        task,
        description,
        assignedTo,
        createdBy: user._id,
      });

      if (res.status !== 201) {
        throw new Error(res.data.message || "Task assignment failed!");
      }
      toast.success("Task assigned successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTask("");
      setDescription("");
      setAssignedTo("");

      await fetchTasks();
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white ">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-5xl mt-7">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
        <p className="text-center mb-4 text-lg">Welcome, {user.username}!</p>

        {user?.role === "admin" ? (
          <div className="min-h-screen flex bg-gray-900 text-white rounded-xl">
            {/* Sidebar */}
            <div className="w-60 m-3 bg-gray-700 p-6 rounded">
              <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
              <ul className="space-y-4">
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded hover:bg-gray-800 ${
                      adminActiveTab === "assign" && "bg-gray-900"
                    }`}
                    onClick={() => setAdminActiveTab("assign")}
                  >
                    Assign Tasks
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded hover:bg-gray-800 ${
                      adminActiveTab === "users" && "bg-gray-900"
                    }`}
                    onClick={() => setAdminActiveTab("users")}
                  >
                    All Users
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded hover:bg-gray-800 ${
                      adminActiveTab === "tasks" && "bg-gray-900"
                    }`}
                    onClick={() => setAdminActiveTab("tasks")}
                  >
                    All Tasks
                  </button>
                </li>
              </ul>
            </div>

            {/* Content Area */}
            <div className="w-3/4 m-3 bg-gray-700 p-6 rounded">
              {adminActiveTab === "assign" && (
                <div className="bg-slate-900 p-6 rounded shadow">
                  <h3 className="text-xl font-semibold mb-4">Assign Tasks</h3>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Task Title"
                      name="task"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                    <select
                      name="assignedTo"
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="w-full p-2 rounded bg-gray-700 text-white"
                    >
                      <option value="">Select user to assign</option>
                      {allUsers.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.username}
                        </option>
                      ))}
                    </select>

                    <textarea
                      placeholder="Task Description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded w-full"
                    >
                      Assign Task
                    </button>
                  </form>
                </div>
              )}

              {adminActiveTab === "users" && (
                <div className="bg-slate-900 p-6 rounded shadow">
                  <h3 className="text-xl font-semibold mb-4">All Users</h3>

                  {allUsers.map((user) => (
                    <ul>
                      <li key={user._id}>
                        <div className="bg-gray-700 p-4 rounded shadow mb-4">
                          <h1>{user.username}</h1>
                          <h4 className="text=white">{user.email}</h4>
                        </div>
                      </li>
                    </ul>
                  ))}
                </div>
              )}

              {adminActiveTab === "tasks" && (
                <div className="bg-slate-900 p-6 rounded shadow">
                  <h3 className="text-xl font-semibold mb-4">All Tasks</h3>

                  {allTasks.length === 0 ? (
                    <h1>No Tasks</h1>
                  ) : (
                    <ul className="bg-gray-700 p-4 rounded space-y-4">
                      {allTasks.map((task) => (
                        <li
                          key={task._id}
                          className="border-b border-gray-600 pb-2"
                        >
                          <p>
                            <strong>Task:</strong> {task.task}
                          </p>
                          <p>
                            <strong>Assigned to:</strong> {task.assignedTo.username}
                          </p>
                          <p>
                            <strong>Status:</strong> {task.status}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <button className="bg-yellow-600 px-3 py-1 rounded">
                              Edit
                            </button>
                            <button className="bg-red-600 px-3 py-1 rounded">
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="min-h-screen flex bg-gray-900 text-white rounded-xl">
              <div className="w-60 m-3 bg-gray-700 p-6 rounded">
                <div className="flex justify-center items-center ">
                  <img
                    src="vite.svg"
                    alt=""
                    className="mr-2"
                    height={20}
                    width={20}
                  />
                  <h2 className="text-2xl font-bold ">User Panel</h2>
                </div>
                <ul className="space-y-4 mt-4">
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded hover:bg-gray-800 ${
                        userActiveTab === "assignedTasks" && "bg-gray-900"
                      }`}
                      onClick={() => setUserActiveTab("assignedTasks")}
                    >
                      Admin Assigned Tasks
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-2 rounded hover:bg-gray-800 ${
                        userActiveTab === "ownTasks" && "bg-gray-900"
                      }`}
                      onClick={() => setUserActiveTab("ownTasks")}
                    >
                      Personal Tasks
                    </button>
                  </li>
                </ul>
              </div>

              {userActiveTab === "assignedTasks" && (
                <div className="bg-gray-700 m-3 p-6 rounded shadow w-3/4">
                  <h3 className="text-lg font-semibold mb-2">
                    📌 Tasks Assigned by Admin
                  </h3>
                  {assignedTasks.length === 0 ? (
                    <p>No tasks assigned yet.</p>
                  ) : (
                    <ul className="space-y-4">
                      {assignedTasks.map((task) => (
                        <li
                          key={task._id}
                          className="bg-gray-700 p-4 rounded shadow"
                        >
                          <p>
                            <strong>Title:</strong> {task.title}
                          </p>
                          <p>
                            <strong>Description:</strong> {task.description}
                          </p>
                          <p>
                            <strong>Status:</strong> {task.status}
                          </p>
                          <button
                            onClick={() => updateStatus(task._id, task.status)}
                            className="mt-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                          >
                            Toggle Status
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {userActiveTab === "ownTasks" && (
                <div className="bg-gray-700 m-3 p-6 rounded shadow w-3/4">
                  <h3 className="text-lg font-semibold mb-2">
                    📝 Your Created Tasks
                  </h3>
                  {ownTasks.length === 0 ? (
                    <p>You haven’t created any tasks yet.</p>
                  ) : (
                    <ul className="space-y-4">
                      {ownTasks.map((task) => (
                        <li
                          key={task._id}
                          className="bg-gray-700 p-4 rounded shadow"
                        >
                          <p>
                            <strong>Title:</strong> {task.title}
                          </p>
                          <p>
                            <strong>Description:</strong> {task.description}
                          </p>
                          <p>
                            <strong>Status:</strong> {task.status}
                          </p>
                          <button
                            onClick={() => updateStatus(task._id, task.status)}
                            className="mt-2 bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                          >
                            Toggle Status
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
