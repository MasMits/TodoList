import * as signalR from '@microsoft/signalr';

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