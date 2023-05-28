import * as React from 'react';
import {RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from "@mui/material";
import Workspace from "./Workspace/Workspace";
import {openAddWorkspaceForm} from "../../store/slices/workspace-input.slice";
import Modal from "./WorkspaceForm/WorkspaceForm";
import './side-bar.css';

export function SideBar() {
    const dispatch = useDispatch();
    const {workspaces, isDrawerOpen} = useSelector((state: RootState) => state.workspaces);

    const isOpenStyle = isDrawerOpen ? 'open' : 'close';
    return (
        <List className={'sidebar ' + isOpenStyle}>
            <div className='workspace-title'>
                <Typography key='workspace' variant="body1"> <b>WorkSpace:</b></Typography>
                <IconButton onClick={() => dispatch(openAddWorkspaceForm())}
                            className='add-workspace-btn'
                            sx={{color: "#494949"}}>
                    <AddIcon/>
                </IconButton>
            </div>
            {workspaces.map((workspace) => (
                <Workspace workspace={workspace} key={workspace.id}/>
            ))}
            <Modal/>
        </List>
    );
}