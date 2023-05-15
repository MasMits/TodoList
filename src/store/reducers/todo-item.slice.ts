import {createSlice} from '@reduxjs/toolkit';
import {ITask} from "../../types/todoTypes";

export interface ITasks {
    tasks: ITask[]
    loading: boolean;
    error: string | null;
}
const initialState: ITasks = {
    tasks: [],
    loading: true,
    error: null,
};


export const todoListSlice = createSlice({
    name: 'todoList',
    initialState: initialState,
    reducers: {
        fetchTasks: (state, action) => {
            state.loading = action.payload;
        },
        fetchTasksSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.tasks = action.payload;
        },
        fetchTasksError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.tasks = [];
        },
        taskAdded: (state, action) => {
            state.tasks.push(action.payload);
        },
        taskUpdatedCompleted: (state, action) => {
            const { id, isChecked } = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex].completed = isChecked;
            }
        },
        taskDeleted: (state, action) => {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
            if (taskIndex !== -1) {
                state.tasks.splice(taskIndex, 1);
            }
        },
        taskMoved: (state, action) => {
            const { id, destinationIndex } = action.payload;
            const draggedTask = state.tasks.find((task) => task.id === id);
            if (!draggedTask) return;
            const draggedTaskOrder = draggedTask.order;
             state.tasks.forEach((item) => {
                if (draggedTask.id == item.id) {
                    item.order = destinationIndex;
                    return;
                }
                if (item.order <= destinationIndex && item.order > draggedTaskOrder) {
                    item.order--;
                    return;
                }
                if (item.order >= destinationIndex && item.order < draggedTaskOrder) {
                    item.order++;
                    return;
                }
            });
            state.tasks.sort((a, b) => a.order - b.order);
        },
    },
});
export const fetchTodos = () => {
    return async (dispatch: any) => {
        dispatch(fetchTasks(true));
        try {
            const response = await fetch('https://ponatosik-001-site1.dtempurl.com/todolist');
            const data = await response.json();
            dispatch(fetchTasksSuccess(data));
        } catch (error) {
            console.log(fetchTasksError);
        } finally {
            dispatch(fetchTasks(false));
        }
    };
};

export const { fetchTasks, fetchTasksSuccess, fetchTasksError, taskAdded, taskUpdatedCompleted, taskDeleted, taskMoved } = todoListSlice.actions;



