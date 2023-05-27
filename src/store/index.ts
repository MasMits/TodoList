import {configureStore} from "@reduxjs/toolkit";
import todoInputReducer from './slices/todo-input.slice';
import {todoListSlice} from "./slices/todo-list.slice";
import thunk from 'redux-thunk'
import workspaceSlice from "./slices/workspace.slice";
import workspaceInputSlice from "./slices/workspace-input.slice";

export const store = configureStore({
    reducer: {
        todoInput: todoInputReducer,
        todoList: todoListSlice.reducer,
        workspaces: workspaceSlice,
        workspaceInput: workspaceInputSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;