const taskRoutes = require("./routes/taskRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
//app.use("/api/tasks", taskRoutes);
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("ProjectSphere AI Backend Running");
});
//this is a port so the browser can access the server, it will use the port defined in the environment variable or default to 5000 if not set
//so the server can be accessed from the browser at http://localhost:5000 or the port defined in the environment variable
//this is useful for deployment, as the port can be set in the environment variable and the server will use that port instead of the default 5000 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);//5173 - port is used for user interface for the better development experience
});