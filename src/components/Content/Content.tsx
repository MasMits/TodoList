import React from 'react';
import Typography from "@mui/material/Typography";
import {Slide} from '@mui/material';
import {ToDoItem} from "./ToDoItem";
import {ToDoInput} from "./ToDoInput";
import {ITask} from "../../types/todoTypes";
import './content.css';

interface ITodoProps {
    data: ITask[] | undefined
}

export const Content = (props: ITodoProps) => {
    return (
        <div className='content'>
            <Slide direction="down" in timeout={1000}>
                <Typography variant="h4">
                    Inbox
                </Typography>
            </Slide>
            {props.data?.map((task, index) => (
                <Slide direction="left" in timeout={250 * (index + 1)} key={task.id}>
                    <div>
                        <ToDoItem task={task}/>
                    </div>
                </Slide>
            ))}
            <ToDoInput/>
        </div>
    );
};

