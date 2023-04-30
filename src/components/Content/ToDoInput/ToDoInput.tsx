import React, {useState} from 'react';
import {DatePicker} from "../DatePicker";
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {sendAddTaskRequest} from "../../../api/signalR";
import './todo-input.css';

export const ToDoInput = () => {
    const [isAddTask, setIsAddTask] = useState(false);
    const [title, setTitle] = useState('');
    if(!isAddTask) return <Button variant="text" startIcon={<AddIcon/>}
                                  onClick={() => setIsAddTask(true)}
                                  className='add-new'>NEW</Button>

    const addButtonHandler = () => {
        sendAddTaskRequest(title, '').then(() => setIsAddTask(false))
    }

    return (
        <div>
            <div className='todo-input'>
                <TextField label='Write your task' variant="standard" className={'input'} onChange={(e) =>  setTitle(e.target.value)}/>
                <div className='info'>
                    <Button variant="outlined" startIcon={<AccountCircleIcon/>}> No date</Button>
                    <Button variant="outlined" startIcon={<DateRangeIcon/>}> No Assignment</Button>
                </div>
                <div className='action-button'>
                    <Button variant="contained" onClick={() => setIsAddTask(false)}>Cancel</Button>
                    <Button variant="contained" onClick={addButtonHandler}>Add Task</Button>
                </div>
            </div>
            <DatePicker/>
        </div>
    );
};

