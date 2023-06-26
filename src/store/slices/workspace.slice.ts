import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IWorkspace} from "../../types/IWorkspace";
import {connectToSignalR} from "../../api/signalR";
import {fetchTodos} from "./todo-list.slice";

interface WorkspaceState {
    workspaces: IWorkspace[];
    isLoading: boolean;
    error: string | null;
    activeWorkspace: number;
    isDrawerOpen: boolean;
}

const initialState: WorkspaceState = {
    workspaces: [],
    isLoading: false,
    error: null,
    isDrawerOpen: true,
    activeWorkspace: 1,
};

export const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        fetchWorkspace(state, action) {
            state.isLoading = action.payload;
        },
        fetchWorkspaceSuccess(state, action: PayloadAction<IWorkspace[]>) {
            state.workspaces = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchWorkspaceError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        addWorkspace(state, action: PayloadAction<IWorkspace>) {
            state.workspaces.push(action.payload);
        },
        updateWorkspaceName(state, action: PayloadAction<{ id: number; name: string }>) {
            const {id, name} = action.payload;
            const workspace = state.workspaces.find((w) => w.id === id);
            if (workspace) {
                workspace.name = name;
            }
        },
        deleteWorkspace(state, action: PayloadAction<number>) {
            state.workspaces = state.workspaces.filter((w) => w.id !== action.payload);
            state.activeWorkspace = state.workspaces[0].id;
        },
        setActiveWorkspace(state, action: PayloadAction<number>) {
            state.activeWorkspace = action.payload;
        },
        changeShowWorkspaceDrawer: (state) => {
            state.isDrawerOpen = !state.isDrawerOpen;
        },
    },
});

export const fetchAllWorkspaces = () => {
    return async (dispatch: any) => {
        dispatch(fetchWorkspace(true));
        try {
            const response = await fetch('https://realtimetodowebapi.azurewebsites.net/Workspaces');
            const data: IWorkspace[] = await response.json();
            await dispatch(setActiveWorkspace(data[0].id));
            await dispatch(fetchWorkspaceSuccess(data));
            connectToSignalR(dispatch, data[0].id);
            await dispatch(fetchTodos(data[0].id));
        } catch (error) {
            console.log(fetchWorkspaceError);
        } finally {
            dispatch(fetchWorkspace(false));
        }
    };
};


export const {
    fetchWorkspace,
    fetchWorkspaceSuccess,
    fetchWorkspaceError,
    addWorkspace,
    updateWorkspaceName,
    deleteWorkspace,
    setActiveWorkspace,
    changeShowWorkspaceDrawer
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
