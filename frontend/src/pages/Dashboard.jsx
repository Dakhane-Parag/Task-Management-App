import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [ownTasks, setOwnTasks] = useState([]);
  const [adminActiveTab, setAdminActiveTab] = useState("assign");
  const [userActiveTab, setUserActiveTab] = useState("assignedTasks");

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
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Task Title"
                      className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Assign to (username or ID)"
                      className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                    <textarea
                      placeholder="Task Description"
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
                  <ul className="bg-gray-700 p-4 rounded">
                    <li>User 1</li>
                    <li>User 2</li>
                    <li>User 3</li>
                    {/* Later: Map through users fetched from backend */}
                  </ul>
                </div>
              )}

              {adminActiveTab === "tasks" && (
                <div className="bg-slate-900 p-6 rounded shadow">
                  <h3 className="text-xl font-semibold mb-4">All Tasks</h3>
                  <ul className="bg-gray-700 p-4 rounded space-y-4">
                    <li className="border-b border-gray-600 pb-2">
                      <p>
                        <strong>Task:</strong> Fix bugs
                      </p>
                      <p>
                        <strong>Assigned to:</strong> User1
                      </p>
                      <p>
                        <strong>Status:</strong> Pending
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
                    {/* Later: Map through tasks fetched from backend */}
                  </ul>
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
