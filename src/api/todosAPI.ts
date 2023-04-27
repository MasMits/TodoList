import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import * as signalR from '@microsoft/signalr';
import {ITask} from "../types/todoTypes";

export type Channel = 'redux' | 'general';

export const todoAPI = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'https://ponatosik-001-site1.dtempurl.com'}),
    endpoints: (build) => ({
        getMessages: build.query<ITask[], Channel>({
            query: () => `/todolist`,
            async onCacheEntryAdded(
                arg,
                {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
            ) {
                const connection = new signalR.HubConnectionBuilder()
                    .withUrl('https://ponatosik-001-site1.dtempurl.com/testHub')
                    .build();
                try {
                    await cacheDataLoaded;
                    connection.on('TaskAdded', (data: ITask) => {
                        updateCachedData((draft) => {
                            draft.push(data);
                        });
                    });
                    await connection.start();
                } catch {
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
                await cacheEntryRemoved;
                await connection.stop();
            },
        }),
    }),
});

export const {useGetMessagesQuery} = todoAPI;
