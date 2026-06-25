import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);

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

    </div>
  );
}

export default ProjectDetails;