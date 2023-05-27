import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {IconButton} from "@mui/material";
import {useDispatch} from "react-redux";
import {changeShowWorkspaceDrawer} from "../../store/slices/workspace.slice";
import './header.css';

const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className='header'>
            <IconButton className='menu' sx={{color: "white"}}
                        onClick={() => dispatch(changeShowWorkspaceDrawer())}><MenuIcon/></IconButton>
        </div>
    );
};

export default Header;