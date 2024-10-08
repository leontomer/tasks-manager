import React, { createContext, useState, useEffect } from "react";
import { getTasks } from "../api/TasksActions";

// Create a context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  // Define the global state
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // New state for editing

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await getTasks();
      setTasks(result.data);
    };
    fetchTasks();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        setTasks,
        editingTask,
        setEditingTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
