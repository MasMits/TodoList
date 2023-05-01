import React from 'react';
import Typography from '@mui/material/Typography';
import {Divider} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Checkbox from '@mui/material/Checkbox';
import {sendDeleteTaskRequest, sendTaskCheckRequest} from "../../../api/signalR";
import {ITaskProps} from "../../../types/todoTypes";
import './todo-item.css';

export const ToDoItem = ({task}: ITaskProps) => {
    const titleClass = task.completed ? 'strike' : 'normal'
    let date = new Date(task.deadline);
    const checkboxHandler = () => {
        sendTaskCheckRequest(task.id, !task.completed);
    }

    const deleteHandler = () => {
        sendDeleteTaskRequest(task.id).then(() => console.log('checked work')) ;
    }

    return (
        <div className='todo-item-divider'>
            <div className='todo-item-control'>
                <DragIndicatorIcon className='control'/>
                <div className='todo-item'>
                    <Checkbox checked={task.completed} onChange={checkboxHandler}/>
                    <div>
                        <Typography noWrap variant="body1" className={titleClass} >
                            {task.title + task.id}
                        </Typography>
                        <div className='todo-item-info'>
                            <DateRangeIcon/>
                            <Typography noWrap variant="body2">
                                {date.getFullYear() + ' ' + date.toLocaleString('default', { month: 'long' })  + ' ' + (date.getDate())}
                            </Typography>
                        </div>
                    </div>
                </div>
                <Button className='control' onClick={deleteHandler}><ClearIcon/></Button>
            </div>
            <Divider/>
        </div>
    );
};


