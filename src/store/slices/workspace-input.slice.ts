import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAddWorkspace: false,
    title: '',
    error: false
};

const workspaceInputSlice = createSlice({
    name: 'workspaceInput',
    initialState,
    reducers: {
        openAddWorkspaceForm: (state) => {
            state.isAddWorkspace = true;
        },
        closeWorkspaceForm: (state) => {
            state.isAddWorkspace = false;
            state.title = '';
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {openAddWorkspaceForm, closeWorkspaceForm, setTitle, setError} = workspaceInputSlice.actions;
export default workspaceInputSlice.reducer;
