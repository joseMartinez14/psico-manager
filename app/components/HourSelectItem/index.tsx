'use client'

import { COLORS } from '@/utils/Contants';
import { Box, Card, Typography } from '@mui/material';
import React from 'react'

interface HourSelectItemProps {
    hourValue: string;
    width: number;
    height: number;
    state: "selected" | "unavailable" | "available";
    fontSize: number;
    onChange: (...event: any[]) => void;
}


const HourSelectItem = (props: HourSelectItemProps) => {

    const { width, height, state, fontSize, hourValue, onChange } = props;

    const backgroundColor = () => {
        switch (state) {
            case "selected":
                return COLORS.selected
            case "unavailable":
                return COLORS.unavailable
            case "available":
                return COLORS.available
        }
    }

    const textColor = () => {
        switch (state) {
            case "selected":
                return COLORS.white
            default:
                return COLORS.black
        }
    }

    const handleClick = () => {
        console.log("Click ", hourValue)
        onChange(hourValue);
    }

    return (
        <div onClick={handleClick}>
            <Card sx={{ width: width, height: height, backgroundColor: backgroundColor(), borderRadius: 8 }}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography
                        sx={{
                            color: textColor(),
                            fontSize: fontSize,
                            textAlign: 'center',
                            verticalAlign: 'center',
                            margin: 0,
                            padding: 0,
                            fontWeight: 200,
                        }}>
                        {hourValue}
                    </Typography>
                </Box>
            </Card>
        </div>
    )

}


export default HourSelectItem
