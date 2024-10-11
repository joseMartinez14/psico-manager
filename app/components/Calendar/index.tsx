'use client'

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { MonthAvailabilityItem } from '@/utils/Types';


function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: MonthAvailabilityItem[] }) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    let dateColor = undefined;
    if (highlightedDays) {
        console.log(highlightedDays)
        const obj = highlightedDays.find(item => item.day == day.date());
        console.log(day.date())
        if (obj) {
            console.log("Aqui")
            if (obj.state) {
                dateColor = '🟢'
            } else {
                dateColor = '🔴'
            }
        }
    }

    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={!props.outsideCurrentMonth ? dateColor : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}

interface CalendarProps {
    datesstate: MonthAvailabilityItem[];
    isLoading: boolean;
}


export default function Calendar(props: CalendarProps) {

    const { datesstate, isLoading } = props;

    const requestAbortController = React.useRef<AbortController | null>(null);

    React.useEffect(() => {

        console.log("---------")
        console.log(datesstate)

        // abort request on unmount
        return () => requestAbortController.current?.abort();
    }, [datesstate]);

    const handleMonthChange = (date: Dayjs) => {

        console.log("*** Se apreto el month ****")
        if (requestAbortController.current) {
            // make sure that you are aborting useless requests
            // because it is possible to switch between months pretty quickly
            requestAbortController.current.abort();
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                    day: ServerDay,
                }}
                sx={{ color: "black" }}
                slotProps={{
                    day: {
                        datesstate,
                    } as any,
                }}
            />
        </LocalizationProvider>
    );
}
