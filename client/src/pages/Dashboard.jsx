import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);

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

  return (
    <div>
      <h1>ProjectSphere AI Dashboard</h1>

      <h2>My Projects</h2>

      {projects.map((project) => (
        <div key={project._id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>{project.domain}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;