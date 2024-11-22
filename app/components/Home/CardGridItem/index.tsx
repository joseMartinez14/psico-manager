'use client'

import { Box, Grid2 } from '@mui/material'
import React from 'react'
import HomeCard from '../HomeCard'

interface CardGridItemProps {
    textColor: string;
    borderColor: string;
    text: string;
    longText: string;
    onCardClick: (longText: string, borderColor: string, title: string) => void;
}

const CardGridItem = (props: CardGridItemProps) => {

    const { textColor, borderColor, text, longText, onCardClick } = props;


    const onDivClick = () => {
        onCardClick(longText, borderColor, text);

    }

    return (
        <Grid2 rowSpacing={1} size={{ xs: 6, md: 2 }}>
            <div onClick={onDivClick}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <HomeCard text={text} textColor={textColor} borderColor={borderColor} boderSize="4px" />
                </Box>
            </div>
        </Grid2>
    )
}

export default CardGridItem;