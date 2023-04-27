import {configureStore} from "@reduxjs/toolkit";
import {todoAPI} from "../api/todosAPI";

export const store = configureStore({
    enhancers: undefined, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoAPI.middleware), preloadedState: undefined,
    reducer: {[todoAPI.reducerPath]: todoAPI.reducer}
});

export type AppDispatch = typeof store.dispatch