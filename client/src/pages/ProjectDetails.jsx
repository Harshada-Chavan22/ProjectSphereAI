

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);

  const [taskTitle, setTaskTitle] = useState("");
const [taskDescription, setTaskDescription] = useState("");
const [priority, setPriority] = useState("Medium");
const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!project) {
    return <h1>Loading...</h1>;
  }

  const createTask = async () => {
  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/tasks",
      {
        title: taskTitle,
        description: taskDescription,
        projectId: id,
        priority,
        deadline,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Task Created Successfully!");

    setTaskTitle("");
    setTaskDescription("");
    setPriority("Medium");
    setDeadline("");

  } catch (error) {
    console.log(error);
    alert("Failed to create task");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-4xl font-bold">
          {project.title}
        </h1>

        <p className="text-gray-600 mt-4">
          {project.description}
        </p>

        <span className="inline-block mt-4 px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
          {project.domain}
        </span>

      </div>
<div className="bg-white mt-8 p-6 rounded-2xl shadow-md">

  <h2 className="text-2xl font-bold mb-6">
    📋 Create New Task
  </h2>

  <input
    type="text"
    placeholder="Task Title"
    value={taskTitle}
    onChange={(e) => setTaskTitle(e.target.value)}
    className="w-full p-3 border rounded-xl mb-4"
  />

  <textarea
    placeholder="Task Description"
    rows="4"
    value={taskDescription}
    onChange={(e) => setTaskDescription(e.target.value)}
    className="w-full p-3 border rounded-xl mb-4"
  />

  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="w-full p-3 border rounded-xl mb-4"
  >
    <option>Low</option>
    <option>Medium</option>
    <option>High</option>
  </select>

  <input
    type="date"
    value={deadline}
    onChange={(e) => setDeadline(e.target.value)}
    className="w-full p-3 border rounded-xl mb-6"
  />

  <button
    onClick={createTask}
    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
  >
    + Create Task
  </button>

</div>
    </div>
    
  );
}

export default ProjectDetails;