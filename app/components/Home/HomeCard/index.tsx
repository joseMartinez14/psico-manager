import { Box, Typography } from '@mui/material'
import React from 'react'
import "@fontsource/montserrat-alternates/700.css"

interface HomeCardProps {
    text: string;
    textColor: string;
    borderColor: string;
    boderSize: string;
}

const HomeCard = (props: HomeCardProps) => {

    const { text, textColor, borderColor, boderSize } = props;

    return (
        <Box
            sx={{
                width: {
                    xs: "160px",
                    sm: "200px",
                    md: "420px",
                    lg: "420px"
                },
                height: {
                    xs: "140px",
                    sm: "140px",
                    md: "150px",
                    lg: "180px"
                },
                border: `${boderSize} solid ${borderColor}`,
                borderRadius: '22px',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgb(204,204,204,10%)'
            }}>

            <Typography
                textAlign={'center'}
                variant="h2"
                color={textColor}
                sx={{
                    fontFamily: ["Montserrat Alternates"].join(","),
                    fontSize: {
                        xs: '18px',
                        sm: '20px',
                        md: '22px',
                        lg: '25px'
                    },
                    fontWeight: 'bold',
                }}>
                {text}

            </Typography>
        </Box>
    )
}


export default HomeCard