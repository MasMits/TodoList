import { configureStore } from "@reduxjs/toolkit";
import todoInputReducer from './reducers/todo-input.slice';
import {todoListSlice} from "./reducers/todo-item.slice";
import thunk from 'redux-thunk'

export const store = configureStore({
    reducer: {
        todoInput: todoInputReducer,
        todoList: todoListSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;