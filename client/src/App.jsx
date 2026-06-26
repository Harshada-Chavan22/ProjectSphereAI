import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route                                                    
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
  path="/project/:id"
  element={<ProjectDetails />}                                                                                      
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;