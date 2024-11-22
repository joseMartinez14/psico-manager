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
import { Box, Typography } from '@mui/material';
import { COLORS } from '@/utils/Contants';


function ServerDay(props: PickersDayProps<Dayjs> & { datesstate?: MonthAvailabilityItem[] }) {
    const { datesstate, day, outsideCurrentMonth, ...other } = props;

    let dateColor = undefined;
    if (datesstate) {
        const obj = datesstate.find(item => item.day == day.date());
        if (obj) {
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
    handleMonthChange: (year: number, month: number) => void;
    handleDayChange: (year: number, month: number, day: number) => void;
    title?: string;
}


export default function Calendar(props: CalendarProps) {

    const { datesstate, isLoading, handleMonthChange, handleDayChange, title } = props;

    const requestAbortController = React.useRef<AbortController | null>(null);

    React.useEffect(() => {
        // abort request on unmount
        return () => requestAbortController.current?.abort();
    }, []);

    const onClick = (date: Dayjs) => {

        if (handleMonthChange) {
            handleMonthChange(date.year(), date.month() + 1)
        } else {
            console.log("POrque putas esta undefined")
        }
    };

    const onDayClick = (date: Dayjs) => {

        if (handleDayChange) {
            handleDayChange(date.year(), date.month() + 1, date.date())
        } else {
            console.log("POrque putas esta undefined")
        }
    };

    return (
        <Box>
            {title && (
                <Box pl={3}>
                    <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{
                            color: COLORS.black,
                            fontSize: '15px',
                            margin: 0,
                            padding: 0,
                            fontWeight: 500,
                        }}>
                        {title}
                    </Typography>
                </Box>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    loading={isLoading}
                    onMonthChange={onClick}
                    onYearChange={onClick}
                    onChange={onDayClick}
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
        </Box>
    );
}
