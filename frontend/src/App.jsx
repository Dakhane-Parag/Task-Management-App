import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import PrivateRoutes from "./routes/PrivateRoutes";
import MyTasks from "./pages/Users/MyTasks";
import UserDashboard from "./pages/Users/UserDashboard";
import Dashboard from "./pages/Admin/Dashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import CreateTask from "./pages/Admin/CreateTask";
import ManageTask from "./pages/Admin/ManageTask";
import TaskDetails from "./pages/Users/TaskDetails";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<PrivateRoutes allowedUsers={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/tasks" element={<ManageTask />} />
          </Route>

          <Route element={<PrivateRoutes allowedUsers={["user"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route
              path="/user/task-details/:id"
              element={<TaskDetails />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
