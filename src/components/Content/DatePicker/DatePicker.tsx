import React from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import './datepicker.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {setDate} from "../../../store/reducers/todo-input.slice";

export const DatePicker = () => {
    const dispatch = useDispatch();
    const {date} = useSelector((state: RootState) => state.todoInput);

    return (
        <div className='date-picker-container'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={dayjs(date)} onChange={
                    (newValue) => dispatch(setDate(newValue?.toISOString()))
                }/>
            </LocalizationProvider>
        </div>
    );
};

