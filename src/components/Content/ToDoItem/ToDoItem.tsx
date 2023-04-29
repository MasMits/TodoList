import React from 'react';
import Typography from '@mui/material/Typography';
import {Divider} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Checkbox from '@mui/material/Checkbox';
import {sendTaskCheckRequest} from "../../../api/signalR";
import {ITaskProps} from "../../../types/todoTypes";
import './todo-item.css';

export const ToDoItem = ({task}: ITaskProps) => {
    const titleClass = task.completed ? 'strike' : 'normal'
    let date = new Date(2023, 5); // test data
    const handler = () => {
        sendTaskCheckRequest(task.id, !task.completed).then(() => console.log('checked work')) ;
    }
    return (
        <div className='todo-item-divider'>
            <div className='todo-item-control'>
                <DragIndicatorIcon className='control'/>
                <div className='todo-item'>
                    <Checkbox checked={task.completed} onChange={handler}/>
                    <div>
                        <Typography noWrap variant="body1" className={titleClass} >
                            {task.title}
                        </Typography>
                        <div className='todo-item-info'>
                            <DateRangeIcon/>
                            <Typography noWrap variant="body2">
                                {date.getFullYear() + ' ' + date.toLocaleString('default', { month: 'long' })}
                            </Typography>
                            <AccountCircleIcon/>
                            <Typography noWrap variant="body2">
                                Jon Snow
                            </Typography>
                        </div>
                    </div>
                </div>
                <Button className='control'><ClearIcon/></Button>
            </div>
            <Divider/>
        </div>
    );
};


