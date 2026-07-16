import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  // Fetch Project Details
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

  // Fetch Tasks
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

  // Create Task
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

      alert("Task Created Successfully");

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

  // Delete Task
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

  // Update Status
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

  if (!project) {
    return <h1 className="text-center mt-10 text-2xl">Loading...</h1>;
  }
    return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Project Details */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold">
          {project.title}
        </h1>

        <p className="text-gray-600 mt-4">
          {project.description}
        </p>

        <div className="mt-5 flex gap-3">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            🌐 {project.domain}
          </span>
        </div>

      </div>

      {/* Create Task */}
      <div className="max-w-3xl mx-auto mt-8">

        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-3xl font-bold text-center mb-8">
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
            rows="4"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-5"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-6"
          />

          <button
            onClick={createTask}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            + Create Task
          </button>

        </div>

      </div>

      {/* Task List */}
      <div className="max-w-5xl mx-auto mt-10">

        <h2 className="text-3xl font-bold mb-6">
          📌 Project Tasks
        </h2>

        {tasks.length === 0 ? (

          <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
            No tasks available.
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >

                <h3 className="text-2xl font-bold">
                  {task.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {task.description}
                </p>

                <div className="flex justify-between mt-5">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {task.priority}
                  </span>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateStatus(task._id, e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">
                      In Progress
                    </option>
                    <option value="Completed">
                      Completed
                    </option>
                  </select>

                </div>

                <p className="mt-5 text-gray-500">
                  📅 Deadline:
                  {" "}
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString(
                        "en-IN"
                      )
                    : "Not Set"}
                </p>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="mt-6 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                >
                  🗑 Delete Task
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ProjectDetails;