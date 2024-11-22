'use client'
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'
import React from 'react'

const AppointmentButtom = () => {
    const router = useRouter()
    return (
        <Box
            sx={{
                width: "100%",
                height: "50px",
                display: 'flex',
                mt: 5,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "450px",
                    height: "70px",
                    border: `4px solid #FA7899`,
                    borderRadius: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <div style={{ width: '100%' }} onClick={() => router.push('/cita')}>
                    <Typography
                        textAlign={'center'}
                        variant="h2"
                        color="#FA7899"
                        sx={{
                            fontFamily: ["Montserrat Alternates"].join(","),
                            fontSize: {
                                xs: '18px',
                                sm: '20px',
                                md: '22px',
                                lg: '25px'
                            },
                            // fontSize: '25px',
                            fontWeight: 'bold',
                        }}>
                        {"Reserva tu cita"}

                    </Typography>
                </div>
            </Box>
        </Box>
    )
}

export default AppointmentButtom