import React from 'react';
import {DatePicker} from "../DatePicker";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const ToDoInput = () => {
    return (
        <div>
            <Button variant="text" startIcon={<AddIcon />}>NEW</Button>
            <DatePicker/>
        </div>
    );
};

