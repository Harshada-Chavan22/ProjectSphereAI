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

return ( <div className="min-h-screen bg-gray-100 flex items-center justify-center"> <div className="bg-white p-10 rounded-3xl shadow-xl w-[450px]">


    <div className="text-5xl text-center mb-4">
      🚀
    </div>

    <h1 className="text-4xl font-bold text-center text-gray-900">
      ProjectSphere AI
    </h1>

    <p className="text-gray-500 text-center mt-2 mb-8">
      Collaborate • Manage • Build Projects
    </p>

    <input
      type="email"
      placeholder="Email"
      className="w-full p-4 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      className="w-full p-4 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      onClick={handleLogin}
      className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition duration-300"
    >
      Login
    </button>

    <p className="text-center mt-6 text-gray-600">
      Don't have an account?
      <span className="text-blue-600 cursor-pointer ml-1 hover:underline">
        Register
      </span>
    </p>

  </div>
</div>

);
}

export default Login;
