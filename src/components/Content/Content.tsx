import React, {useCallback} from 'react';
import {RootState} from "../../store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Slide} from '@mui/material';
import {AnimatedToDoItem} from "./ToDoItem";
import {ToDoInput} from "./ToDoInput";
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import {sendMoveTaskRequest} from "../../api/signalR";
import {taskMoved} from "../../store/slices/todo-list.slice";
import {useDispatch, useSelector} from "react-redux";
import {ITask} from "../../types/todoTypes";
import './content.css';

interface IContentProps {
    todos?: ITask[];
}

export const Content = ({ todos }: IContentProps) => {

    const {isDrawerOpen} = useSelector((state: RootState) => state.workspaces);

    const dispatch = useDispatch();
    console.log(todos)
    const handleOnDragEnd = useCallback(
        async (result: DropResult) => {
            if (!result.destination) return;

            const id = todos?.find((item) => item.order === result.source.index)?.id;
            if (!id) return;

            await dispatch(taskMoved({ id, destinationIndex: result.destination.index }));
            sendMoveTaskRequest(id, result.destination.index);
        },
        [dispatch, todos]
    );

    return (
        <Box className="content"
             sx={{
            transition: 'margin-left 0.2s',
            marginLeft: isDrawerOpen ? 0 : '-200px',
        }}
        >

            <Slide direction="down" in timeout={1000}>
                <Typography variant="h4" className="title">Inbox</Typography>
            </Slide>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <ul className="todos" {...provided.droppableProps} ref={provided.innerRef}>
                            {(todos ?? []).map((task, index) => (
                                <AnimatedToDoItem key={task.id} task={task} index={index} />
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <div className='todo-input-container'>
                <ToDoInput />
            </div>
        </Box>
    );
};

