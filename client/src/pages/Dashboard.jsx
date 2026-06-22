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
        Menu
      </h2>

      <ul className="space-y-4">
        <li className="hover:text-blue-600 cursor-pointer">
          Dashboard
        </li>

        <li className="hover:text-blue-600 cursor-pointer">
          Projects
        </li>

        <li className="hover:text-blue-600 cursor-pointer">
          Tasks
        </li>

        <li
          className="text-red-500 cursor-pointer"
          onClick={logout}
        >
          Logout
        </li>
      </ul>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8">

      <h1 className="text-4xl font-bold mb-6">
        Welcome Harshada 👋
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
      <div className="bg-white p-6 rounded-xl shadow-md mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Create New Project
        </h2>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />

        <input
          type="text"
          placeholder="Domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          onClick={createProject}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          + Create Project
        </button>

      </div>

      {/* Project Cards */}
      <h2 className="text-2xl font-bold mt-8 mb-4">
        My Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-5 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-bold">
              {project.title}
            </h3>

            <p className="text-gray-600 mt-2">
              {project.description}
            </p>

            <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              {project.domain}
            </span>
          </div>
        ))}

      </div>

    </div>
  </div>
</div>

);
}

export default Dashboard;
