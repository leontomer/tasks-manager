import React,{useState, useContext} from 'react'
import CreateTasks from './CreateTasks';
import "./Tasks.scss";
import { GlobalContext } from '../../context/GlobalContext';
import { Tooltip } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {deleteTask} from '../../api/TasksActions';
import Alert from '@mui/material/Alert';

export default function Tasks() {
    const { tasks, setTasks, setDeleteError, setEditingTask, editingTask } = useContext(GlobalContext);
    const [deleteErrorLocal, setDeleteErrorLocal] = useState(false);
    const handleDeleteTask = async (taskId) => {
        const deleteResult = await deleteTask(taskId);
        if(deleteResult.data.acknowledged){
            setTasks(tasks.filter(task=>task._id!==taskId));
        }
        else
            {
                setDeleteErrorLocal(true);
                setTimeout(() => {
                    setDeleteErrorLocal(false);
                  }, 5000);
            }
    }

    const handleDoubleClick = (task) => {
        setEditingTask(task);
    };


  return (
    <div className='tasks-section'>
        <span className='header'>
            <h1>Tasks Manager</h1>
        </span>
        <div className='general-tasks-container'>
            <div className='tasks-container'>
                {tasks.map((task)=>(
                   <div key={task._id} style={{display: "flex", justifyContent: "space-between", cursor: "pointer"}} onDoubleClick={() => handleDoubleClick(task)}>
                    <Tooltip  title={task.taskDetails || ''}>
                         <div  style={{marginTop: "10px"}} >{task.taskName} </div>
                    </Tooltip>
                    <DeleteOutlinedIcon  style={{cursor: "pointer"}} onClick={()=>handleDeleteTask(task._id)}/>
                    </div>
                ))}
            </div>
        <CreateTasks />
        </div>
        {deleteErrorLocal && <div style={{display:"flex", alignItems: "center", justifyContent: "center"}}><Alert severity="error">Delete task failed</Alert> </div>}
    </div>
  )
}