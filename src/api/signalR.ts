 import * as signalR from '@microsoft/signalr';
 import {ITask} from "../types/todoTypes";
 import {taskAdded, taskDeleted, taskMoved, taskUpdatedCompleted} from "../store/reducers/todo-item.slice";

export const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://ponatosik-001-site1.dtempurl.com/testHub')
    .build();

export const startSignalRConnection = async () => {
    try {
        await connection.start();
        console.log('SignalR connection started.');
    } catch (err) {
        console.error('SignalR connection failed: ', err);
    }
};

export const stopSignalRConnection = async () => {
    try {
        await connection.stop();
        console.log('SignalR connection stopped.');
    } catch (err) {
        console.error('SignalR connection failed to stop: ', err);
    }
};

export const sendTaskCheckRequest = async (taskId: number, isChecked: boolean) => {
    try { // CheckTask
        await connection.invoke('UpdateTaskCompleted', taskId, isChecked);
        console.log(`SignalR CheckTask request sent for task ${taskId}.`);
    } catch (err) {
        console.error(`SignalR CheckTask request failed for task ${taskId}: `, err);
    }
};

export const sendDeleteTaskRequest = async (taskId: number) => {
    try {
        await connection.invoke('DeleteTask', taskId);
        console.log(`SignalR DeleteTask request sent for task ${taskId}.`);
    } catch (err) {
        console.error(`SignalR DeleteTask request failed for task ${taskId}: `, err);
    }
};

export const sendAddTaskRequest = async (title: string, deadline = '') => {
    try {
        await connection.invoke('AddTask', title, deadline);
        console.log(`SignalR AddTask request sent for task ${title}.`);
    } catch (err) {
        console.error(`SignalR AddTask request failed for task ${title}: `, err);
    }
};

 export const sendMoveTaskRequest = async (id: number, shiftIndex: number) => {
     try {
         await connection.invoke('MoveTask', id, shiftIndex);
         console.log(`SignalR MoveTask request sent for task with id ${id} to destinationIndex  ${shiftIndex}.`);
     } catch (err) {
         console.error(`SignalR MoveTask request failed for task  with sourceIndex ${id} to destinationIndex  ${shiftIndex}: `, err);
     }
 };

 export const connectToSignalR = async (dispatch: any) => {
     await startSignalRConnection();

     connection.on('TaskAdded', (data: ITask) => {
         dispatch(taskAdded(data));
     });
     connection.on('TaskUpdatedCompleted', (id: number, isChecked: boolean) => {
         dispatch(taskUpdatedCompleted({ id, isChecked }));
     });
     connection.on('TaskDeleted', (id: number) => {
         dispatch(taskDeleted(id));
     });
     connection.on('TaskMoved', (id: number, destinationIndex: number) => {
         dispatch(taskMoved({ id, destinationIndex }));
     });

     console.log('SignalR connected and listening for messages.');
 };