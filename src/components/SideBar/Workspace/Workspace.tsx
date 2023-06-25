import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {IWorkspaceProps} from "../../../types/IWorkspace";
import ClearIcon from "@mui/icons-material/Clear";
import {sendDeleteWorkspaceRequest} from "../../../api/workspaceAPI";
import {useDispatch, useSelector} from "react-redux";
import {setActiveWorkspace} from "../../../store/slices/workspace.slice";
import './workspace.css';
import CircleIcon from '@mui/icons-material/Circle';
import {IconButton} from "@mui/material";
import {RootState} from "../../../store";
import {fetchTodos} from "../../../store/slices/todo-list.slice";
import {sendConnectToWorkspaceRequest} from "../../../api/signalR";

const Workspace = ({workspace}: IWorkspaceProps) => {
    const dispatch = useDispatch();
    const {activeWorkspace} = useSelector((state: RootState) => state.workspaces);

    const deleteHandler = async () => {
        await sendDeleteWorkspaceRequest(workspace.id);
    };

    const workspaceHandler = () => {
        dispatch(fetchTodos(activeWorkspace));
        sendConnectToWorkspaceRequest(activeWorkspace);
        dispatch(setActiveWorkspace(workspace.id))
    }
    return (
        <ListItem key={workspace.id} disablePadding className='flex workspace' >
            <ListItemButton onClick={workspaceHandler} selected={activeWorkspace === workspace.id} >
                <CircleIcon sx={{ fontSize: 10, color: '#737373'}} className='workspace-bullet-point'/>
                <ListItemText primary={'  ' + workspace.name} />
            </ListItemButton>
            {/*<ListItemText primary={workspace.taskCount} />*/}
            <IconButton onClick={deleteHandler} className='deleteButton' component="label">
                <ClearIcon fontSize="small"/>
            </IconButton>
        </ListItem>
    );
};

export default Workspace;