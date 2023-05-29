import React from 'react';
import Typography from '@mui/material/Typography';
import {Divider, IconButton, Slide} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Checkbox from '@mui/material/Checkbox';
import {sendDeleteTaskRequest, sendTaskCheckRequest} from '../../../api/signalR';
import {useDispatch} from 'react-redux';
import {taskUpdatedCompleted} from '../../../store/slices/todo-list.slice';
import {ITask, ITaskProps} from '../../../types/todoTypes';
import {Draggable} from "react-beautiful-dnd";
import './todo-item.css';

 const ToDoItem: React.FC<ITaskProps> = ({task}) => {
    const {id, completed, deadline, title} = task;
    const titleClass = completed ? 'strike' : 'normal';
    const dispatch = useDispatch();
    const date = new Date(deadline);
    const dateString = date.toLocaleString('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const checkboxHandler = async () => {
        await dispatch(taskUpdatedCompleted({id, isChecked: !completed}));
        sendTaskCheckRequest(id, !completed);
    };

    const deleteHandler = async () => {
        await sendDeleteTaskRequest(id);
    };

    return (
        <div className="todo-item-divider">
            <div className="todo-item-control">
                <DragIndicatorIcon className="control"/>
                <div className="todo-item">
                    <Checkbox checked={completed} onChange={checkboxHandler}/>
                    <div>
                        <Typography variant="body1" className={titleClass}>
                            {title}
                        </Typography>
                        <div className="todo-item-info">
                            <DateRangeIcon/>
                            <Typography noWrap variant="body2">
                                {dateString}
                            </Typography>
                        </div>
                    </div>
                </div>
                <IconButton className="control" onClick={deleteHandler}>
                    <ClearIcon/>
                </IconButton>
            </div>
            <Divider/>
        </div>
    );
};


export const AnimatedToDoItem = ({ task, index }: { task: ITask; index: number }) => {
    const animationSpeed = (n: number) => 250 * Math.min(n + 1, 7);

    return (
        <Slide direction="left" in timeout={animationSpeed(index)} key={task.id}>
            <div>
                <Draggable key={task.id} draggableId={String(task.id)} index={task.order}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <ToDoItem task={task} />
                        </div>
                    )}
                </Draggable>
            </div>
        </Slide>
    );
};
