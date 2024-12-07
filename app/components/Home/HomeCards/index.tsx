'use client'
import { Box, Collapse, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardGridItem from '../CardGridItem'

interface HomeCardsProps {
    SobreNosotros: string;
    PortacionArmas: string;
    Terapia: string;
    Diagnosis: string;
}

function wait(n: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, n));
}

type textPopType = {
    color: string;
    title: string;
    text: string;
}

const HomeCards = (props: HomeCardsProps) => {

    const [textPop, setTextPop] = useState<textPopType | null>(null);
    const [textLines, setTextLines] = useState<string[]>([]);
    const [openCard, setopenCard] = useState<boolean>(false);

    const animation_time = 800;

    useEffect(() => {
        if (textPop) {
            setTextLines(textPop.text.split("\\n"))
        }
    }, [textPop])

    const { SobreNosotros, PortacionArmas, Terapia, Diagnosis } = props;

    const setTextPopNull = async () => {
        await wait(animation_time);
        setTextPop(null);
    }

    const onCardClick = (longText: string, borderColor: string, title: string) => {
        setopenCard(true)
        if (textPop) {
            if (textPop.title === title) {
                setopenCard(false)
                setTextPopNull()
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
            <Collapse in={openCard} timeout={animation_time} exit={true}>
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
                                    key={text}
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
            </Collapse>
            <Grid2 rowSpacing={2} width={'100%'} justifyContent="space-evenly" alignItems="center" container>
                <CardGridItem onCardClick={onCardClick} text="Sobre nosotros" textColor="#2D939D" borderColor="#2D939D" longText={SobreNosotros} />
                <CardGridItem onCardClick={onCardClick} text="Dictamen para portación de armas" textColor="#D49FD8" borderColor="#D49FD8" longText={PortacionArmas} />
                <CardGridItem onCardClick={onCardClick} text="Terapia psicológica" textColor="#F88069" borderColor="#F88069" longText={Terapia} />
                <CardGridItem onCardClick={onCardClick} text="Psico-diagnósticos" textColor="#BB8112" borderColor="#BB8112" longText={Diagnosis} />
            </Grid2>
        </>
    )
}

export default HomeCards