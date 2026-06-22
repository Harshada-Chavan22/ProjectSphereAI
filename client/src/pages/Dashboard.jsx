import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
const [projects, setProjects] = useState([]);

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [domain, setDomain] = useState("");

useEffect(() => {
fetchProjects();
}, []);

const fetchProjects = async () => {
try {
const token = localStorage.getItem("token");


  const res = await API.get("/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setProjects(res.data);
} catch (error) {
  console.log(error);
}


};

const createProject = async () => {
try {
const token = localStorage.getItem("token");


  await API.post(
    "/projects",
    {
      title,
      description,
      domain,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Project Created Successfully");

  setTitle("");
  setDescription("");
  setDomain("");

  fetchProjects();
} catch (error) {
  console.log(error);
  alert("Failed to create project");
}


};

const logout = () => {
localStorage.removeItem("token");
window.location.href = "/";
};

return ( <div className="min-h-screen bg-gray-100">


  {/* Navbar */}
  <div className="bg-blue-600 text-white p-4 shadow-lg">
    <h1 className="text-2xl font-bold">
      ProjectSphere AI
    </h1>
  </div>

  <div className="flex">

    {/* Sidebar */}
    <div className="w-64 bg-white h-screen shadow-md p-5">
      <h2 className="font-bold text-xl mb-6">
        Navigation
      </h2>

      <ul className="space-y-5">
        <li className="hover:text-blue-600 cursor-pointer font-medium">
          🏠 Dashboard
        </li>

        <li className="hover:text-blue-600 cursor-pointer font-medium">
          📁 Projects
        </li>

        <li className="hover:text-blue-600 cursor-pointer font-medium">
          ✅ Tasks
        </li>

        <li
          className="text-red-500 cursor-pointer font-medium"
          onClick={logout}
        >
          🚪 Logout
        </li>
      </ul>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8">

      <h1 className="text-4xl font-bold mb-6">
        Welcome, Harshada 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">
            Total Projects
          </h2>

          <p className="text-3xl font-bold">
            {projects.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">
            Total Tasks
          </h2>

          <p className="text-3xl font-bold">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">
            Completed Tasks
          </h2>

          <p className="text-3xl font-bold">
            0
          </p>
        </div>

      </div>

      {/* Create Project Form */}
<div className="bg-white p-8 rounded-2xl shadow-md mt-8">

  <div className="mb-6">
    <h2 className="text-2xl font-bold">
      Create New Project
    </h2>
  </div>

  <div className="max-w-3xl mx-auto">

    <div className="mb-4">
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="mb-4">
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="mb-6">
      <input
        type="text"
        placeholder="Domain (e.g. MERN, AI/ML, Web Development)"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <button
        onClick={createProject}
        className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
      >
        + Create Project
      </button>
    </div>

  </div>

</div>

      {/* Project Cards */}
      <h2 className="text-2xl font-bold mt-8 mb-4">
        My Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-bold">
              {project.title}
            </h3>

            <p className="text-gray-600 mt-3">
              {project.description}
            </p>

            <span className="inline-block mt-4 px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              {project.domain}
            </span>

            <button
              className="mt-4 block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Open Project
            </button>

          </div>
        ))}

      </div>

    </div>
  </div>
</div>


);
}

export default Dashboard;
