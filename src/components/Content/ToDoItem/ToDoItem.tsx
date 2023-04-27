import React from 'react';
import {ITaskProps} from "../../../types/todoTypes";
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import './todo-item.css';
import {Divider} from "@mui/material";

export const ToDoItem = ({task}: ITaskProps) => {
    return (
        <>
            <div className='todo-item'>
                <Checkbox/>
                <Typography noWrap variant="body1" gutterBottom>
                    {task.title}
                    Task {task.id}
                </Typography>
            </div>
            <Divider/>
        </>

    );
};


