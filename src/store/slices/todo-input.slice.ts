import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAddTask: false,
    isAddDate: false,
    date: '2023-05-02',
    title: '',
    error: false
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
        openAddDateForm: (state) => {
            state.isAddDate = !state.isAddDate;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {openAddTaskForm, closeAddTaskForm, setTitle, openAddDateForm, setDate, setError} = todoInputSlice.actions;
export default todoInputSlice.reducer;
