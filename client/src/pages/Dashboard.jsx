function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      
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

            <li className="text-red-500 cursor-pointer">
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
          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-gray-500">
                Total Projects
              </h2>

              <p className="text-3xl font-bold">
                1
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-gray-500">
                Total Tasks
              </h2>

              <p className="text-3xl font-bold">
                1
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

        </div>
      </div>
    </div>
  );
}

export default Dashboard;