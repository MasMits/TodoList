import {configureStore} from "@reduxjs/toolkit";
import {todoAPI} from "../api/todosAPI";
import todoInputReducer from './reducers/todo-input.slice';

export const store = configureStore({
    enhancers: undefined, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoAPI.middleware), preloadedState: undefined,
    reducer: {[todoAPI.reducerPath]: todoAPI.reducer, todoInput: todoInputReducer}
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
