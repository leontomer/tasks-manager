import axios from "axios";

export const saveTask = async (task) => {
  return await axios.post("/tasks/saveTask", task);
};

export const getTasks = async () => {
  return await axios.get("/tasks/getTasks");
};

export const deleteTask = async (taskId) => {
  return await axios.delete(`/tasks/deleteTask/${taskId}`);
};
