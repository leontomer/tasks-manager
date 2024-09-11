import React, { createContext, useState, useEffect } from "react";
import { getTasks } from "../api/TasksActions";
// Create a context
const GlobalContext = createContext();

// Create a provider component
const GlobalProvider = ({ children }) => {
  // Define the global state
  const [tasks, setTasks] = useState([]);

useEffect(()=>{
async function initTasks() {
  const tasks = await getTasks();
  setTasks(tasks.data);
}
initTasks();
},[])

  // Define any functions that modify the state
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <GlobalContext.Provider value={{ tasks, addTask, setTasks}}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
