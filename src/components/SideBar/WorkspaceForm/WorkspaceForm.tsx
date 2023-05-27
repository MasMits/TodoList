import * as React from 'react';
import {RootState} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {TextField} from "@mui/material";
import {closeWorkspaceForm, setError, setTitle} from "../../../store/slices/workspace-input.slice";
import {sendAddWorkspaceRequest} from "../../../api/workspaceAPI";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
};

export default function WorkspaceForm() {
    const handleClose = () => dispatch(closeWorkspaceForm());
    const dispatch = useDispatch();
    const {isAddWorkspace, title, error} = useSelector((state: RootState) => state.workspaceInput);
    if (title) {
        dispatch(setError(false))
    }
    const addButtonHandler = () => {
        if (!title) {
            dispatch(setError(true))
            return;
        }
        sendAddWorkspaceRequest(title).then(handleClose);
    };
    return (
        <div>
            <Modal
                open={isAddWorkspace}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='todo-input'>
                        <TextField error={error}
                                   label='Write title of your workspace' variant="standard" className={'input'}
                                   onChange={(e) => dispatch(setTitle(e.target.value))}/>
                        <div className='input-buttons'>
                            <div className='action-button'>
                                <Button variant="contained" onClick={handleClose}
                                        color='inherit'>Cancel</Button>
                                <Button variant="contained" onClick={addButtonHandler}>Add Workspace</Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}