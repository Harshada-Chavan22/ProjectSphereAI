import { useParams } from "react-router-dom";

function ProjectDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-6">
        Project Details
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md">

        <h2 className="text-2xl font-bold">
          Project ID
        </h2>

        <p className="text-gray-600 mt-2">
          {id}
        </p>

      </div>

    </div>
  );
}

export default ProjectDetails;