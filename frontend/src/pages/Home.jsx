import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Hero Section */}
      <header className="w-full py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">🚀 TaskFlow: Your Ultimate Task Manager</h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Organize tasks, collaborate with teams, and meet deadlines effortlessly.
        </p>
        <div className="mt-6">
          { user ? (
          <h1 class="text-xl font-bold text-center text-white mt-2">
          Streamline Your Tasks, Elevate Your Productivity!
        </h1>
        
          ) : (
            <>
            <button 
            onClick={() => navigate("/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold mx-2 transition cursor-pointer"
          >
            Get Started
          </button>
          <button 
            onClick={() => navigate("/login")}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold mx-2 transition cursor-pointer"
          >
            Login
          </button>
          </>
          )}</div>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-5xl px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">🔥 Why Choose TaskFlow?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">📌 Task Assignment</h3>
            <p className="text-gray-300 mt-2">Easily assign tasks and set priorities.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">⏳ Deadline Tracking</h3>
            <p className="text-gray-300 mt-2">Stay on top of deadlines with notifications.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">📊 Progress Reporting</h3>
            <p className="text-gray-300 mt-2">Get insights into task completion status.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">👥 Role-Based Access</h3>
            <p className="text-gray-300 mt-2">Control access levels for better security.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">💬 Real-Time Collaboration</h3>
            <p className="text-gray-300 mt-2">Work together with live task updates.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">🔒 Secure Authentication</h3>
            <p className="text-gray-300 mt-2">Login with protected user credentials.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 text-gray-400 text-sm text-center">
        © 2025 TaskFlow | Designed for productivity ✨
      </footer>
    </div>
  );
}
