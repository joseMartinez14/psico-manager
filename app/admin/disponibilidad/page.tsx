import { Box, Typography } from '@mui/material'
import React from 'react'
import AddAvailForm from './AddDispForm'

const AddAvailability = () => {
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
                    {'Agregar disponibilidad'}
                </Typography>
            </Box>
            <Box width={'100%'} px={3}>
                {/* <AddAvailability /> */}
                <AddAvailForm />
            </Box>

        </Box>
    )
}

export default AddAvailability