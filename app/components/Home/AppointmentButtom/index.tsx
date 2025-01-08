'use client'
import { Box, Button, Typography } from '@mui/material';
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
                <Button
                    onClick={() => router.push('/cita')}
                    sx={{
                        width: '100%',
                        height: '100%',
                        textTransform: 'none',
                        background: 'none',
                        border: 'none',
                        color: '#FA7899',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: ["Montserrat Alternates"].join(","),
                        fontWeight: 'bold',
                        fontSize: {
                            xs: '18px',
                            sm: '20px',
                            md: '22px',
                            lg: '25px'
                        },
                    }}
                >
                    Reserva tu cita
                </Button>
            </Box>
        </Box>
    );
}

export default AppointmentButtom