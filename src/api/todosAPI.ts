import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {startSignalRConnection, stopSignalRConnection, connection} from './signalR';
import {ITask} from "../types/todoTypes";

export const todoAPI = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'https://ponatosik-001-site1.dtempurl.com'}),
    endpoints: (build) => ({
        getTodoList: build.query<ITask[], void>({
            query: () => `/todolist`,
            async onCacheEntryAdded(arg, api) {
                await startSignalRConnection();
                connection.on('TaskAdded', (data: ITask) => {
                    api.updateCachedData((draft) => {
                        draft.push(data);
                    });
                });
                connection.on('TaskUpdatedCompleted', (id: number, isChecked:  boolean) => {
                    api.updateCachedData((draft) => {
                        const taskIndex = draft.findIndex((task) => task.id === id);
                        draft[taskIndex].completed = isChecked
                    });

                });
                await api.cacheEntryRemoved;
                await stopSignalRConnection();
            },
        }),
    }),
});

export const {useGetTodoListQuery} = todoAPI;
