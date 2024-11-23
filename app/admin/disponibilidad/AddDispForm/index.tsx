'use client'
import Calendar from '@/app/components/Calendar';
import HourSelect from '@/app/components/HourSelect';
import HourSelectItem from '@/app/components/HourSelectItem';
import { COLORS } from '@/utils/Contants';
import { DayHourAvailabilityItem } from '@/utils/Types';
import { Box, Button, Grid2, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { json } from 'stream/consumers';

const dayAvailability: DayHourAvailabilityItem[] = Array.from({ length: 24 }, (_, i) => {
    const hour12 = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 ? "am" : "pm";
    const hourStr = `${hour12}:00 ${period}`;
    return {
        state: "available",
        hour: hourStr,
        document_id: hourStr
    };
});

function formatDate(day: number, month: number, year: number): string {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthString = months[month - 1];
    return `${day.toString()} ${monthString} ${year}`;
}

function parseDate(dateString: string): { day: number; month: number; year: number } {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [dayString, monthString, yearString] = dateString.split(" ");

    // Parse the day, month, and year
    const day = parseInt(dayString, 10);
    const month = months.indexOf(monthString) + 1; // Months are 1-indexed
    const year = parseInt(yearString, 10);

    // Validate the parsed values
    if (isNaN(day) || month === 0 || isNaN(year)) {
        throw new Error("Invalid date format");
    }

    return { day, month, year };
}


interface AvailableDataStruc {
    year: number;
    month: number;
    day: number;
    hour: string;
    duration: number;
}


const AddAvailForm = () => {
    const [availableHours, setAvailableHours] = useState<DayHourAvailabilityItem[]>(dayAvailability);
    const [selectedDates, setSelectedDates] = useState<DayHourAvailabilityItem[]>([]);
    const Swal = require('sweetalert2')


    function handleDayChange(year: number, month: number, day: number) {
        console.log(day, month, year)
        const date_string = formatDate(day, month, year);

        if (!selectedDates.find((item) => item.document_id == date_string)) {
            setSelectedDates([...selectedDates, {
                state: "available",
                hour: date_string,
                document_id: date_string
            }])
        }
    }

    function handleDateCancel(date_id: string) {
        const new_array = selectedDates.filter((item) => item.document_id !== date_id)
        setSelectedDates(new_array)
    }



    const onHourClick = (hour_id: string) => {
        const new_array: DayHourAvailabilityItem[] = availableHours.map(item => {
            if (item.document_id === hour_id) {
                if (item.state == "selected") {
                    return { ...item, state: "available" }; // Select the target hour
                }
                return { ...item, state: "selected" }; // Select the target hour
            }
            return item;
        });

        setAvailableHours(new_array);
    }

    const onSubmit = () => {
        const struc_data: AvailableDataStruc[] = []

        selectedDates.forEach((date_str) => {
            const date = parseDate(date_str.hour);
            availableHours.forEach((hour) => {
                if (hour.state === "selected") {
                    struc_data.push({
                        year: date.year,
                        month: date.month,
                        day: date.day,
                        hour: hour.hour,
                        duration: 60
                    })
                }
            })
        })

        console.log(struc_data)

        axios.post('/api/admin/availability', struc_data, { withCredentials: true })
            .then((res) => {
                console.log(res)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Se guardo la disponibilidad",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch((error) => {
                console.error(error)
                Swal.fire({
                    title: "Error",
                    text: "Error en las credenciales",
                    icon: "error"
                });
            })



    }


    return (
        <Box
        >
            <Grid2 container >
                <Grid2 size={{ lg: 6, md: 12, xs: 12 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <Box pb={2} pl={3} >
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                sx={{
                                    color: COLORS.black,
                                    fontSize: '15px',
                                    margin: 0,
                                    padding: 0,
                                    fontWeight: 500,
                                }}>
                                {"Seleccione las horas"}
                            </Typography>
                        </Box>
                        <Grid2 container spacing={2} >
                            {availableHours.map((item) => (
                                <Grid2 >
                                    <HourSelectItem onSelect={() => { }} onChange={onHourClick} id={item.document_id} hourValue={item.hour} width={80} height={30} state={item.state} fontSize={16} />
                                </Grid2>
                            ))}
                        </Grid2>
                        {/* <HourSelect onSelect={onHourSelect} data={availableHours} selectedValue='availability_id' control={null} isRequired={true} loading={false} /> */}
                    </Box>
                </Grid2>
                <Grid2 size={{ lg: 6, md: 12, xs: 12 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <Box width={{ xl: '60%', lg: '70%', md: '40%', sm: '40%', xs: '75%' }} pt={3}>
                            <Calendar title={'Seleccione la fecha y horario'} handleDayChange={handleDayChange} datesstate={[]} isLoading={false} handleMonthChange={() => { }} />
                        </Box>
                        <Grid2 container spacing={2} >
                            {selectedDates.map((item) => (
                                <Grid2 >
                                    <HourSelectItem onSelect={() => { }} onChange={onHourClick} id={item.document_id} hourValue={item.hour} width={180} height={30} state={item.state} fontSize={16} onCancel={handleDateCancel} />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Box>
                </Grid2>

            </Grid2>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                <Button
                    sx={{
                        my: 5,
                        height: 48,
                        fontSize: '16px',
                        fontWeight: 500,
                        backgroundColor: COLORS.secundary
                    }}
                    variant="contained"
                    onClick={onSubmit}
                >
                    {"Agregar disponibilidad"}
                </Button>
            </Box>


        </Box>
    )
}

export default AddAvailForm