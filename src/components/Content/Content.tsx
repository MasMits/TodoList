import React from 'react';
import Typography from "@mui/material/Typography";
import {Slide} from '@mui/material';
import {ToDoItem} from "./ToDoItem";
import {ToDoInput} from "./ToDoInput";
import {ITask} from "../../types/todoTypes";
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';
import {sendMoveTaskRequest} from "../../api/signalR";
import {taskMoved} from "../../store/reducers/todo-item.slice";
import {useDispatch} from "react-redux";
import './content.css';

// npm i --save-dev @types/react-beautiful-dnd
// npm i react-beautiful-dnd

interface ITodoProps {
    data: ITask[] | undefined
}

export const Content = (props: ITodoProps) => {
    const dispatch = useDispatch();

    console.log(props.data)

    async function handleOnDragEnd(result: DropResult) {
        if (!result.destination) return;
        const idDndItem = props.data?.find(item => item.order === result.source.index)?.id
        if (idDndItem === undefined) return;
        await dispatch(taskMoved({id: idDndItem, destinationIndex: result.destination.index}))

        console.log('taskMoved')
        sendMoveTaskRequest(idDndItem, result.destination.index)
    }

    const animationSpeed = (n: number) => {
        return n < 6 ? 250 * (n + 1) : 250 * (6 + 1)
    }

    return (
        <div className='content'>
            <Slide direction="down" in timeout={1000}>
                <Typography variant="h4">
                    Inbox
                </Typography>
            </Slide>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <ul className="todos" {...provided.droppableProps} ref={provided.innerRef}>
                            {props.data?.map((task, index) => (
                                <Slide direction="left" in timeout={animationSpeed(index)} key={task.id}>
                                    <div>
                                        <Draggable key={task.id} draggableId={String(task.id)} index={task.order}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <ToDoItem task={task}/>
                                                </div>
                                            )}
                                        </Draggable>
                                    </div>
                                </Slide>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <ToDoInput/>
        </div>
    );
};

