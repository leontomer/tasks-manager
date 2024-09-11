import React,{useState, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {saveTask} from '../../api/TasksActions';
import { GlobalContext } from '../../context/GlobalContext';

export default function CreateTasks() {
    const [taskName,setTaskName] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const { addTask } = useContext(GlobalContext);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const addedTask = await saveTask({taskName, taskDetails});
        addTask(addedTask.data);
    }
        return (
            <div className='create-tasks-container'>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div>create a task</div>
                    <TextField
                        required
                        style={{marginTop: "20px"}}
                        label="Task Name"
                        value={taskName}
                        onChange={(e)=>setTaskName(e.target.value)}
                    />
                <div>
                    <TextField
                        style={{marginTop: "20px"}}
                        label="Task Details"
                        value={taskDetails}
                        multiline={true}
                        onChange={(e)=>setTaskDetails(e.target.value)}
                    />
                    <div style={{marginTop: "20px"}}>
                        <Button type="submit">Save Task</Button> 
                    </div> 
                    </div>
                </form>
            </div>
  )
}
