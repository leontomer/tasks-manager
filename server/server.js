const express = require("express");
const connectDB = require("./config/db");
const app = express();
const http = require("http");
const server = http.createServer(app);

require("dotenv").config();
const tasksApi = require("./routes/api/tasksAPI");
connectDB();
const port = process.env.PORT || 5000;
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use("/tasks", tasksApi);

server.listen(port, () => console.log(`server is running on port ${port}`));
