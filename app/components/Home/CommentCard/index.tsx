import { Box, Divider, Typography } from '@mui/material';
import React from 'react'

interface CommentCardProps {
    clientName: string;
    commentText: string;
    borderColor: string;
}

const CommentCard = (props: CommentCardProps) => {

    const { clientName, commentText, borderColor } = props;

    return (
        <Box
            sx={{
                width: '300px',
                height: "100%",
                minHeight: "50px",
                border: `2px solid ${borderColor}`,
                borderRadius: '22px',
                display: 'flex',
                flexDirection: "column",
                p: 2
            }}>
            <Typography
                pb={1}
                sx={{
                    fontFamily: ["Montserrat Alternates"].join(","),
                    fontSize: '18px',
                    // fontSize: '25px',
                    fontWeight: '400',
                }}>
                {clientName}

            </Typography>

            <Divider />


            <Typography
                variant="body1"
                sx={{
                    fontSize: '15px',
                    // fontSize: '25px',
                    fontWeight: '400',
                    wordSpacing: 5,
                    borderSpacing: 50,
                    pt: 1
                }}>
                {commentText
                }
            </Typography>
        </Box>

    )
}

export default CommentCard