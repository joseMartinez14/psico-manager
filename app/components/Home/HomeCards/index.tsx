'use client'
import { Box, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HomeCard from '../HomeCard'
import CardGridItem from '../CardGridItem'

interface HomeCardsProps {

}

type textPopType = {
    color: string;
    title: string;
    text: string;
}

const HomeCards = (props: HomeCardsProps) => {

    const [textPop, setTextPop] = useState<textPopType | null>(null);
    const [textLines, setTextLines] = useState<string[]>([]);

    useEffect(() => {
        if (textPop) {
            setTextLines(textPop.text.split("\\n"))
        }
    }, [textPop])

    const { } = props;

    const onCardClick = (longText: string, borderColor: string, title: string) => {
        if (textPop) {
            if (textPop.title === title) {
                setTextPop(null);
            } else {
                setTextPop({
                    color: borderColor,
                    title: title,
                    text: longText
                });
            }
        } else {
            setTextPop({
                color: borderColor,
                title: title,
                text: longText
            });
        }
    }

    return (
        <>
            {textPop &&
                <Box
                    sx={{
                        width: "100%",
                        display: 'flex',
                        mb: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Box
                        sx={{
                            width: {
                                xs: '96%',
                                sm: '90%',
                                md: '85%',
                                lg: '80%',
                                xl: '75%'
                            },
                            height: "100%",
                            minHeight: "125px",
                            border: `4px solid ${textPop.color}`,
                            borderRadius: '22px',
                            display: 'flex',
                            flexDirection: "column",
                            p: 2
                        }}>
                        <Typography
                            variant="h2"
                            pb={1}
                            sx={{
                                fontFamily: ["Montserrat Alternates"].join(","),
                                fontSize: '15px',
                                // fontSize: '25px',
                                fontWeight: '600',
                            }}>
                            {textPop.title}

                        </Typography>

                        {textLines.map(text => (
                            <Typography
                                variant="body1"
                                component={"pre"}
                                style={{ wordWrap: "break-word" }}
                                sx={{
                                    fontSize: '15px',
                                    // fontSize: '25px',
                                    fontWeight: '400',
                                    wordSpacing: 5,
                                    borderSpacing: 50,
                                    whiteSpace: 'pre-line'
                                }}>
                                {text}
                            </Typography>
                        ))}


                    </Box>
                </Box>
            }
            <Grid2 rowSpacing={2} width={'100%'} justifyContent="space-evenly" alignItems="center" container>


                <CardGridItem onCardClick={onCardClick} text="Sobre nosotros" textColor="#2D939D" borderColor="#2D939D" longText=' Sobre nosotros Sobre <br /> nosotros Sobre nosotros Sobre nosotros \n Sobre nosotros Sobre nosotros ' />
                <CardGridItem onCardClick={onCardClick} text="Dictamen para portación de armas" textColor="#D49FD8" borderColor="#D49FD8" longText='2 texto 2 texto 2 texto 2 texto 2 texto 2 texto 2 texto 2 texto ' />
                <CardGridItem onCardClick={onCardClick} text="Terapia psicológica" textColor="#F88069" borderColor="#F88069" longText='3 text 3 text 3 text 3 text 3 text 3 text 3 text 3 text 3 text 3 text ' />
                <CardGridItem onCardClick={onCardClick} text="Psico-diagnósticos" textColor="#BB8112" borderColor="#BB8112" longText='4 text 4 text 4 text 4 text 4 text 4 text 4 text 4 text 4 text 4 text ' />


            </Grid2>
        </>
    )
}

export default HomeCards