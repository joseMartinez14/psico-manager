
'use client'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect } from 'react';
import { Suspense } from 'react';

import DateCalendarServerRequest from '@/app/components/CalendarExample';

const CompoExample = () => {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Suspense fallback={<div>Loading...</div>}>
                    <DateCalendar />
                </Suspense>
            </LocalizationProvider>
            putaaa
            < DateCalendarServerRequest />
        </div >
    )
}

export default CompoExample