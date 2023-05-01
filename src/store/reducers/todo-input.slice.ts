import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAddTask: false,
    title: '',
};

const todoInputSlice = createSlice({
    name: 'todoInput',
    initialState,
    reducers: {
        openAddTaskForm: (state) => {
            state.isAddTask = true;
        },
        closeAddTaskForm: (state) => {
            state.isAddTask = false;
            state.title = '';
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
    },
});

export const { openAddTaskForm, closeAddTaskForm, setTitle } = todoInputSlice.actions;
export default todoInputSlice.reducer;
