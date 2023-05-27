import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IWorkspace} from "../../types/IWorkspace";
import workspace from "../../components/SideBar/Workspace/Workspace";
import {connectToSignalR} from "../../api/signalR";


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
            // const id = state.workspaces.length + 1;
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
            const response = await fetch('https://ponatosik-001-site1.dtempurl.com/workspaces');
            const data: IWorkspace[] = await response.json();
            await dispatch(fetchWorkspaceSuccess(data));
            connectToSignalR(dispatch, data[0].id);
            await dispatch(setActiveWorkspace(data[0].id));
        } catch (error) {
            console.log(fetchWorkspaceError);
        } finally {
            console.log('fetchWorkspace(false))')
            dispatch(fetchWorkspace(false));
        }
        return workspace;
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
