'use client'
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import React from 'react'

const DropdownSelect = () => {

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };


    return (
        <div style={{ width: '100%' }}>
            <Typography >
                Seleccione el tipo de cita
            </Typography>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{
                    width: '100%'
                }}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>

        </div>
    )
}

export default DropdownSelect