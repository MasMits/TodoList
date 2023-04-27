import React from 'react';
import {ITaskProps} from "../../../types/todoTypes";
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import './todo-item.css';

export const ToDoItem = ({task}: ITaskProps) => {
    return (
        <div className='todo-item'>
            <Checkbox/>
            <Typography noWrap variant="body1" gutterBottom width='100px' >
                {task.title}
                Task {task.id}
            </Typography>
        </div>
    );
};


