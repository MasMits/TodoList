import React from 'react';
import {DatePicker} from "../DatePicker";
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DateRangeIcon from "@mui/icons-material/DateRange";
import {sendAddTaskRequest} from "../../../api/signalR";
import './todo-input.css';
import {useDispatch, useSelector} from "react-redux";
import {closeAddTaskForm, openAddTaskForm, setTitle, openAddDateForm} from "../../../store/reducers/todo-input.slice";
import {RootState} from "../../../store";

export const ToDoInput = () => {
    const dispatch = useDispatch();
    const { isAddTask, title, date, isAddDate } = useSelector((state: RootState) => state.todoInput);
    const addButtonHandler = () => {
        sendAddTaskRequest(title, date).then(() => dispatch(closeAddTaskForm()));
    };

    if(!isAddTask) return <Button variant="text" startIcon={<AddIcon/>}
                                  onClick={() => dispatch(openAddTaskForm())}
                                  className='add-new'>NEW</Button>

    return (
        <div>
            <div className='todo-input'>
                <TextField label='Write your task' variant="standard" className={'input'} onChange={(e) => dispatch(setTitle(e.target.value))}/>
                <div className='input-buttons'>
                <div className='info'>
                    <Button variant="outlined" onClick={() => dispatch(openAddDateForm())} startIcon={<DateRangeIcon/>}> {date.slice(0,10) || 'No date'}</Button>
                </div>
                <div className='action-button'>
                    <Button variant="contained" onClick={() => dispatch(closeAddTaskForm())}>Cancel</Button>
                    <Button variant="contained" onClick={addButtonHandler}>Add Task</Button>
                </div>
                </div>
            </div>
            {isAddDate && <DatePicker/>}
        </div>
    );
};

