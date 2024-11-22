'use client'

import { COLORS } from '@/utils/Contants';
import { Box, Card, Typography } from '@mui/material';
import React from 'react'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface HourSelectItemProps {
    hourValue: string;
    id: string;
    width: number;
    height: number;
    state: "selected" | "unavailable" | "available";
    fontSize: number;
    onChange: (...event: any[]) => void;
    onSelect: (hourValue: string) => void;
    onCancel?: (hourValue: string) => void;

}


const HourSelectItem = (props: HourSelectItemProps) => {

    const { width, height, state, fontSize, hourValue, onChange, onSelect, id, onCancel } = props;

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
        console.log("Click ", hourValue, state, id)
        if (state != "unavailable") {
            onChange(id);
            onSelect(hourValue);
        }
    }


    return (
        <div onClick={handleClick}>
            <Card sx={{ width, height, backgroundColor: backgroundColor(), borderRadius: 3, position: 'relative', overflow: 'visible' }}>
                {/* Red Circle with "X" */}
                {onCancel &&
                    <div onClick={() => { onCancel(id) }}>
                        <CancelOutlinedIcon sx={{
                            position: 'absolute',
                            top: -8,
                            right: -4,
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }} />
                    </div>
                }

                {/* Main Content */}
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            color: textColor(),
                            fontSize,
                            textAlign: 'center',
                            fontWeight: 200,
                        }}
                    >
                        {hourValue}
                    </Typography>
                </Box>
            </Card>
        </div>
    )

}


export default HourSelectItem
