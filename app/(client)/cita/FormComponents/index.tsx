'use client'
import Calendar from '@/app/components/Calendar';
import { AppointmentAttributeItem, DayAvailabilityItem, DayHourAvailabilityItem, MonthAvailabilityItem } from '@/utils/Types';
import { Box, Button, Divider, Grid2, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { dateNumbers, SetAppoitmentForm } from '../type';
import HourSelect from '@/app/components/HourSelect';
import DropdownInput from '@/app/components/DropdownInput';
import FormSummary from '@/app/components/FormSummary';
import "@fontsource/montserrat-alternates";
import TextInput from '@/app/components/TextInput';
import { COLORS } from '@/utils/Contants';
import axios from 'axios';


function formatDate(day: number, month: number, year: number): string {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthString = months[month - 1]; // Adjust for zero-based index
    return `${day.toString()} ${monthString} ${year}`;
}

interface CitaFormComponentProps {
    monthAvailability: MonthAvailabilityItem[];
    dayAvailability: DayAvailabilityItem[];
    appointmentTypes: AppointmentAttributeItem[];
    appointmentModes: AppointmentAttributeItem[];
}

function selectHour(
    availabilityList: DayHourAvailabilityItem[],
    targetHour: string
): DayHourAvailabilityItem[] {
    return availabilityList.map(item => {
        if (item.state === "selected") {
            return { ...item, state: "available" }; // Deselect currently selected item
        }
        if (item.hour === targetHour) {
            return { ...item, state: "selected" }; // Select the target hour
        }
        return item;
    });
}

function deSelectHour(
    availabilityList: DayHourAvailabilityItem[]
): DayHourAvailabilityItem[] {
    return availabilityList.map(item =>
        item.state === "selected"
            ? { ...item, state: "available" }
            : item
    );
}

const CitaFormComponent = (props: CitaFormComponentProps) => {

    const { monthAvailability, dayAvailability, appointmentModes, appointmentTypes } = props;
    const router = useRouter();
    const [loadingCalendar, setLoadingCalendar] = useState<boolean>(false);
    const [loadingDay, setLoadingDay] = useState<boolean>(false);
    const [availableHours, setAvailableHours] = useState<DayHourAvailabilityItem[]>([]);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<dateNumbers | null>(null);

    const Swal = require('sweetalert2')


    const onHourSelect = (hour: string) => {
        if (selectedHour == hour) {
            setAvailableHours(deSelectHour(availableHours))
            setSelectedHour(null)
        } else {
            setAvailableHours(selectHour(availableHours, hour))
            setSelectedHour(hour)
        }
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<SetAppoitmentForm>();

    const formData = watch();

    const onSubmit = async (data: SetAppoitmentForm) => {
        const res = await axios.post(`/api/admin/appointment`, data)
            .then(response => {
                Swal.fire({
                    title: "Se agendo correctamente",
                    text: "Recibirá un correo con los detalles de la cita.",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    title: "Error",
                    text: "Error al agendar la cita",
                    icon: "error"
                });
            })
    }

    function handleMonthChange(year: number, month: number) {
        setLoadingCalendar(true);
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("month", month.toString())
        newSearchParams.set("year", year.toString())
        router.push(`${window.location.pathname}?${newSearchParams.toString()}`)
    }

    function handleDayChange(year: number, month: number, day: number) {
        setLoadingDay(true);

        setSelectedDate({ day: day, month: month, year: year });

        const newSearchParams = new URLSearchParams();
        newSearchParams.set("month", month.toString())
        newSearchParams.set("year", year.toString())
        newSearchParams.set("day", day.toString())
        router.push(`${window.location.pathname}?${newSearchParams.toString()}`)
    }

    useEffect(() => {
        setLoadingCalendar(false);
        //changeParams();
        console.log("---------------------")
        console.log(monthAvailability)
    }, [monthAvailability]);

    useEffect(() => {
        setLoadingDay(false);

        const structure_data: DayHourAvailabilityItem[] = dayAvailability.map(item => {
            return {
                hour: item.hour,
                state: item.state ? "available" : "unavailable",
                document_id: item.document_id
            }
        })

        setAvailableHours(structure_data);
    }, [dayAvailability]);





    return (
        <Box
            component="form"
            autoComplete="on"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid2 container >

                <Grid2 pb={3} size={{ lg: 6, md: 12, xs: 12 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                        <DropdownInput control={control} title='Seleccione el tipo de cita' data={appointmentTypes} value='appointmentType' isRequired={true} error={errors?.appointmentType ? "Seleccione el tipo de cita" : undefined} selectStyles={{ width: '300px' }} />
                    </Box>
                </Grid2>
                <Grid2 pb={3} size={{ lg: 6, md: 12, xs: 12 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                        <DropdownInput control={control} title='Seleccione la modalidad' data={appointmentModes} value='appointmentMode' isRequired={true} error={errors?.appointmentMode ? "Seleccione la modalidad de la cita" : undefined} selectStyles={{ width: '300px' }} />
                    </Box>
                </Grid2>
                <Grid2 size={{ lg: 6, md: 12, xs: 12 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                        <Calendar title={'Seleccione la fecha y horario'} handleDayChange={handleDayChange} datesstate={monthAvailability} isLoading={loadingCalendar} handleMonthChange={handleMonthChange} />
                        <HourSelect onSelect={onHourSelect} data={availableHours} selectedValue='appointmentHour' control={control} isRequired={true} loading={loadingDay} error={errors?.appointmentHour ? "Seleccione la hora" : undefined} />
                    </Box>
                </Grid2>
                <Grid2 size={{ lg: 6, md: 12, xs: 12 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                        <Box width={{ xl: '60%', lg: '70%', md: '40%', sm: '40%', xs: '75%' }} pt={3}>
                            <FormSummary title='Resumen:' type={appointmentTypes.find(item => item.id == formData.appointmentType)?.value || ""} mode={appointmentModes.find(item => item.id == formData.appointmentMode)?.value || ""} date={selectedDate ? formatDate(selectedDate.day, selectedDate.month, selectedDate.year) : ""} time={selectedHour || ""} />
                        </Box>
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
                <Divider sx={{ py: 3, width: '85%' }}>
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontFamily: ["Montserrat Alternates", "sans - serif"].join(","),
                            fontStyle: "cursive",
                        }}>
                        {"Datos personales"}
                    </Typography>
                </Divider>
            </Box>

            <Grid2 container >

                <Grid2 pb={3} size={{ lg: 6, md: 12, xs: 12 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                        <TextInput control={control} title='Nombre completo' value='name' isRequired={true} styles={{ width: '350px' }} error={errors?.name ? "Inserte su nombre" : undefined} />
                    </Box>
                </Grid2>
                <Grid2 pb={3} size={{ lg: 6, md: 12, xs: 12 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                        <TextInput control={control} title='Correo electronico' value='email' isRequired={true} styles={{ width: '350px' }} error={errors?.email ? "Inserte su correo" : undefined} />
                    </Box>
                </Grid2>
                <Grid2 size={{ lg: 6, md: 12, xs: 12 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                        <TextInput control={control} title='Numero de telefono' value='phone' isRequired={true} styles={{ width: '350px' }} error={errors?.phone ? "Inserte su numero de telefono" : undefined} justNumber={true} />
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
                    type="submit">
                    {"Agendar cita"}
                </Button>
            </Box>
        </Box>

    )
}

export default CitaFormComponent
