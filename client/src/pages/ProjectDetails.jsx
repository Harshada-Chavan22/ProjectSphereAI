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

  const [tasks, setTasks] = useState([]);
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
      const fetchTasks = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(res.data);
  } catch (error) {
    console.log(error);
  }
};

      setProject(res.data);
      fetchTasks();
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

    fetchTasks();

  } catch (error) {
    console.log(error);
    alert("Failed to create task");
  }
};

const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTasks();
  } catch (error) {
    console.log(error);
  }
};
const updateStatus = async (taskId, status) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/tasks/${taskId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();
  } catch (error) {
    console.log(error);
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
<div className="max-w-3xl mx-auto mt-8">
  <div className="bg-white p-8 rounded-2xl shadow-lg">
  
  <h2 className="text-2xl font-bold mb-6">
    📋 Create New Task
  </h2>

  <input
    type="text"
    placeholder="Task Title"
    value={taskTitle}
    onChange={(e) => setTaskTitle(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <textarea
    placeholder="Task Description"
    rows="4"
    value={taskDescription}
    onChange={(e) => setTaskDescription(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option>Low</option>
    <option>Medium</option>
    <option>High</option>
  </select>

  <input
    type="date"
    value={deadline}
    onChange={(e) => setDeadline(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    onClick={createTask}
    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
  >
    + Create Task
  </button>
  <button
  onClick={() => deleteTask(task._id)}
  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
>
  🗑 Delete
</button>
</div>

</div>
<div className="max-w-4xl mx-auto mt-8">

  <h2 className="text-3xl font-bold mb-6">
    📋 Project Tasks
  </h2>

  {tasks.length === 0 ? (

    <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
      No tasks created yet.
    </div>

  ) : (

    <div className="space-y-5">

      {tasks.map((task) => (

        <div
          key={task._id}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
        >

          <div className="flex justify-between items-center">

            <h3 className="text-xl font-bold">
              {task.title}
            </h3>

            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {task.priority}
            </span>

          </div>

          <p className="text-gray-600 mt-3">
            {task.description}
          </p>

          <div className="flex justify-between items-center mt-5">

            <p className="text-gray-500">
              Deadline:
              {" "}
              {task.deadline?.substring(0, 10)}
            </p>

            <select
  value={task.status}
  onChange={(e) => updateStatus(task._id, e.target.value)}
  className="border rounded-lg px-3 py-2"
>
  <option value="To Do">To Do</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>
            
            <button
      onClick={() => deleteTask(task._id)}
      className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
    >
      🗑 Delete
    </button>
          </div>

        </div>

      ))}

    </div>

  )}

</div>
    </div>
    
  );
}
// this component is responsible for displaying the details of a specific project, 
// allowing users to create new tasks, view existing tasks, update their status, and delete them. 
// It fetches project and task data from an API and manages state using React hooks.
//so this is a comprehensive project management interface that provides users with the ability to manage tasks within a project effectively.
export default ProjectDetails;