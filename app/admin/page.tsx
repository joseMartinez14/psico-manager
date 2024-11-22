import { Box, Typography } from '@mui/material'
import React from 'react'
import AppointmentTable from '../components/Admin/AppointmentTable'
import axios from 'axios'
import { redirect } from 'next/navigation'




const adminPage = async () => {


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
                    {'Proximas citas'}
                </Typography>
            </Box>
            <Box width={'100%'} px={3}>
                <AppointmentTable />
            </Box>

        </Box>
    )
}

export default adminPage