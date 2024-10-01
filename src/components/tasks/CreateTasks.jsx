import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { createTask, editTask } from '../../api/TasksActions';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

export default function CreateTasks() {
  const { tasks, setTasks, editingTask, setEditingTask } = useContext(GlobalContext);
  const [taskName, setTaskName] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {

    if (editingTask) {
      setTaskName(editingTask.taskName);
      setTaskDetails(editingTask.taskDetails || '');
    } else {
      setTaskName('');
      setTaskDetails('');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingTask) {
      // Edit existing task
      try {
        const updatedTask = await editTask({ ...editingTask, taskName, taskDetails });
        setTasks(tasks.map(task => task._id === updatedTask.data._id ? updatedTask.data : task));
        setEditingTask(null); // Clear editing state
        setTaskName('');
        setTaskDetails('');
      } catch (err) {
        setError('Failed to update task.');
        console.error('Error updating task:', err);
      }
    } else {
      // Create new task
      try {
        const newTask = await createTask({ taskName, taskDetails });
        setTasks([...tasks, newTask.data]);
        setTaskName('');
        setTaskDetails('');
      } catch (err) {
        setError('Failed to create task.');
        console.error('Error creating task:', err);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setTaskName('');
    setTaskDetails('');
  };

  return (
    <div className='create-task-container'>
      <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <div>
          <label style ={{display: 'flex'}}>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            style ={{margin: '10px'}}
          />
        </div>
        <div>
          <label style ={{display: 'flex'}}>Task Details:</label>
          <textarea
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
            placeholder="Optional"
            style ={{margin: '10px'}}
          />
        </div>
        <Button style ={{margin: '10px'}} variant="contained" type="submit">{editingTask ? 'Update Task' : 'Add Task'}</Button>
        {editingTask && <Button style ={{margin: '10px'}} variant="contained" type="button" onClick={handleCancelEdit}>Cancel</Button>}
      </form>
    </div>
  );
}