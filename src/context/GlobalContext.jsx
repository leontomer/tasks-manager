import React, { createContext, useState, useEffect } from "react";
import { getTasks } from "../api/TasksActions";

// Create a context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  // Define the global state
  const [tasks, setTasks] = useState([]);
  const [deleteError, setDeleteError] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // New state for editing

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await getTasks();
      setTasks(result.data);
    };
    fetchTasks();
  }, []);

  // Define any functions that modify the state
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        setTasks,
        deleteError,
        setDeleteError,
        editingTask,
        setEditingTask, // Provide setter
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
