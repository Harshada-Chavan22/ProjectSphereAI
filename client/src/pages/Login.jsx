import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <div className="text-5xl text-center mb-3">
  🚀
</div>
        <h1 className="text-3xl font-bold text-center mb-2">
          ProjectSphere AI
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Collaborate • Manage • Build Projects
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        <p className="text-center mt-4 text-gray-600">
  Don't have an account?
  <span className="text-blue-600 cursor-pointer ml-1">
    Register
  </span>
</p>
      </div>
    </div>
  );
}

export default Login;