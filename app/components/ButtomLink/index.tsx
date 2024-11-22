'use client'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'
import React from 'react'

interface ButtomLinkProps {
    to: string;
    text: string;
}

const ButtomLink = (props: ButtomLinkProps) => {
    const router = useRouter()

    const { to, text } = props;

    return (
        <Button component={'text'} onClick={() => router.push(to)} sx={{ color: 'white' }}>{text}</Button>
    )
}

export default ButtomLink