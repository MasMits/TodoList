import React from 'react';
import {ToDoItem} from "./ToDoItem";
import {ToDoInput} from "./ToDoInput";
import {ITask} from "../../types/todoTypes";
import './content.css';

interface ITodoProps{
    data: ITask[] | undefined
}

export const Content = (props: ITodoProps) => {
    return (
        <div>
                {props.data?.map(task => (
                    <ToDoItem task={task} key={task.id}/>
                ))}
            <ToDoInput/>
        </div>
    );
};

