import * as signalR from '@microsoft/signalr';
import {HubConnectionState} from "@microsoft/signalr";
import {addWorkspace, deleteWorkspace} from "../store/slices/workspace.slice";
import {IWorkspace} from "../types/IWorkspace";

export const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://realtimetodowebapi.azurewebsites.net/workspaceshub')
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

export const sendAddWorkspaceRequest = async (name: string) => {
    try {
        await connection.invoke('AddWorkspace', name);
        console.log(`SignalR AddWorkspace request sent for task with name ${name}.`);
    } catch (err) {
        console.error(`SignalR AddWorkspace request failed for task with name ${name}: `, err);
    }
};

export const sendUpdateWorkspaceNameRequest = async (id: number, name = '') => {
    try {
        await connection.invoke('UpdateWorkspaceName', id, name);
        console.log(`SignalR UpdateWorkspaceName request sent for task ${id}.`);
    } catch (err) {
        console.error(`SignalR UpdateWorkspaceName request failed for task ${id}: `, err);
    }
};

export const sendDeleteWorkspaceRequest = async (id: number) => {
    try {
        await connection.invoke('DeleteWorkspace', id);
        console.log(`SignalR DeleteWorkspace request sent for task with id ${id}`);
    } catch (err) {
        console.error(`SignalR DeleteWorkspace request failed for task  with sourceIndex ${id}`, err);
    }
};

export const connectToWorkspaceSignalR = async (dispatch: any) => {
    if (connection.state === HubConnectionState.Connected) return;
    await startSignalRConnection();

    connection.on('AddWorkspace', (workspace: IWorkspace) => {
        dispatch(addWorkspace(workspace));
    });
    connection.on('UpdateWorkspaceName', () => {
        // dispatch(taskUpdatedCompleted({ id, isChecked }));
    });
    connection.on('DeleteWorkspace', (id: number) => {
        dispatch(deleteWorkspace(id));

    });
    console.log('SignalR connected and listening for messages.');
};