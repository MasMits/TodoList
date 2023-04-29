import React from 'react';
import {CircularProgress} from "@mui/material";
import './loading.css';

export const Loading = () => {
    return (
        <div className='loading'>
            <CircularProgress color="inherit" />
        </div>
    );
};

