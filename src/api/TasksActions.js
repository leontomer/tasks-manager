import axios from "axios";

export const createTask = async (task) => {
  return await axios.post("/tasks/createTask", task);
};

export const getTasks = async () => {
  return await axios.get("/tasks/getTasks");
};

export const deleteTask = async (taskId) => {
  return await axios.delete(`/tasks/deleteTask/${taskId}`);
};

export const editTask = async (task) => {
  return await axios.put("/tasks/editTask", task);
};
