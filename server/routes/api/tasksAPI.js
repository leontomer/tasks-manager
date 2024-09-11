const express = require("express");
const router = express.Router();
const task = require("../../models/tasks.model");

router.post("/saveTask", async (req, res) => {
  try {
    const { taskName, taskDetails } = req.body;
    const newCreatedTask = new task({
      taskName,
      taskDetails,
    });
    await newCreatedTask.save();
    res.status(200).send(newCreatedTask);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.get("/getTasks", async (req, res) => {
  try {
    const tasks = await task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await task.deleteOne({ _id: id });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
