import React from 'react'
import Tasks from './components/tasks/Tasks';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <GlobalProvider>
    <Tasks />
   </GlobalProvider>
  )
}

export default App
