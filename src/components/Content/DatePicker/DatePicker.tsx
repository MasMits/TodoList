import React from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import dayjs, {Dayjs} from 'dayjs';
import './datepicker.css';

export const DatePicker = () => {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    console.log(value?.toISOString())
    return (
        <div className='date-picker-container'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={value} onChange={(newValue) => setValue(newValue)}/>
            </LocalizationProvider>
        </div>
    );
};

