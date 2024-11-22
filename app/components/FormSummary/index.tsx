import { COLORS } from '@/utils/Contants';
import { Box, Typography } from '@mui/material';
import React from 'react'

interface FormSummaryProps {
    title: string;
    type?: string;
    mode?: string;
    date: string;
    time: string;
}

const FormSummary = (props: FormSummaryProps) => {

    const { title, type, mode, date, time } = props;

    return (
        <Box>
            <Typography
                gutterBottom
                sx={{
                    color: COLORS.black,
                    fontSize: '15px',
                    mb: 2.5,
                    padding: 0,
                    fontWeight: 700,
                }}>
                {title}
            </Typography>
            {type &&
                <Typography
                    gutterBottom
                    sx={{
                        color: COLORS.black,
                        fontSize: '15px',
                        mb: 0.5,
                        padding: 0,
                        fontWeight: 400,
                    }}>
                    {`Tipo: ${type}`}
                </Typography>
            }
            {mode &&
                <Typography
                    gutterBottom
                    sx={{
                        color: COLORS.black,
                        fontSize: '15px',
                        mb: 0.5,
                        padding: 0,
                        fontWeight: 400,
                    }}>
                    {`Modalidad: ${mode}`}
                </Typography>
            }
            <Typography
                gutterBottom
                sx={{
                    color: COLORS.black,
                    fontSize: '15px',
                    mb: 0.5,
                    padding: 0,
                    fontWeight: 400,
                }}>
                {`Fecha: ${date}`}
            </Typography>

            <Typography
                gutterBottom
                sx={{
                    color: COLORS.black,
                    fontSize: '15px',
                    mb: 0.5,
                    padding: 0,
                    fontWeight: 400,
                }}>
                {`Hora: ${time}`}
            </Typography>

        </Box>
    )
}

export default FormSummary
