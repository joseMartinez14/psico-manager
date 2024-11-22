import { Box, Typography } from '@mui/material'
import React from 'react'
import CalendarAvailabilityFormComponent from './FormComponent';

interface QueryParams {
    month?: string;
    year?: string;
    day?: string;
}

const getMonthAvailability = async (month: string | null | undefined, year: string | null | undefined) => {
    let url = ""
    if (month && year) {
        url = `${process.env.MY_API_URL}/availability/month?month=${month}&year=${year}`
    } else {
        url = `${process.env.MY_API_URL}/availability/month`
    }
    const res = await fetch(url, { cache: 'no-store' })
    const avail = await res.json()
    return avail;
}

const getDayAvailability = async (month: string | null | undefined, year: string | null | undefined, day: string | null | undefined) => {
    let url = ""
    if (month && year && day) {
        url = `${process.env.MY_API_URL}/availability/day?month=${month}&year=${year}&day=${day}`
    } else {
        url = `${process.env.MY_API_URL}/availability/day`
    }
    const res = await fetch(url, { cache: 'no-store' })
    const avail = await res.json()
    return avail;
}


const AdminCalendar = async ({ searchParams }: { searchParams: QueryParams }) => {
    const { month, year, day } = searchParams;

    const monthAvailability = await getMonthAvailability(month, year);
    const dayAvailability = await getDayAvailability(month, year, day);


    return (
        <Box display={'flex'} flexDirection={'column'} width={'100%'}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pb: 4
            }}>
                <Typography
                    variant='h1'
                    sx={{
                        fontSize: 36,
                        textAlign: 'center',
                        verticalAlign: 'center',
                        fontStyle: "cursive",
                        margin: 0,
                        padding: 0,
                        fontWeight: 300,
                    }}>
                    {'Mi calendario'}
                </Typography>
            </Box>
            <Box width={'100%'} px={3}>
                <CalendarAvailabilityFormComponent monthAvailability={monthAvailability} dayAvailability={dayAvailability} />
            </Box>

        </Box>
    )
}

export default AdminCalendar