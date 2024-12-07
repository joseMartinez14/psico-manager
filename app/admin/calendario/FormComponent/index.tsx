'use client'
import Calendar from '@/app/components/Calendar';
import { DayAvailabilityItem, DayHourAvailabilityItem, MonthAvailabilityItem } from '@/utils/Types';
import { Box, Button, Grid2 } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import HourSelect from '@/app/components/HourSelect';
import FormSummary from '@/app/components/FormSummary';
import "@fontsource/montserrat-alternates";
import { COLORS } from '@/utils/Contants';
import { dateNumbers } from '@/app/(client)/cita/type';
import { DeleteAvailabilityForm } from './type';
import axios from 'axios';


function formatDate(day: number, month: number, year: number): string {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthString = months[month - 1]; // Adjust for zero-based index
    return `${day.toString()} ${monthString} ${year}`;
}

interface CalendarAvailabilityFormComponentProps {
    monthAvailability: MonthAvailabilityItem[];
    dayAvailability: DayAvailabilityItem[];
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

const CalendarAvailabilityFormComponent = (props: CalendarAvailabilityFormComponentProps) => {

    const { monthAvailability, dayAvailability } = props;
    const router = useRouter();
    const [loadingCalendar, setLoadingCalendar] = useState<boolean>(false);
    const [loadingDay, setLoadingDay] = useState<boolean>(false);
    const [availableHours, setAvailableHours] = useState<DayHourAvailabilityItem[]>([]);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<dateNumbers | null>(null);

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
    } = useForm<DeleteAvailabilityForm>();

    const onSubmit = async (data: DeleteAvailabilityForm) => {
        //axios.delete(`${process.env.NEXT_PUBLIC_MY_API_URL}/admin/availability?ID=${data.availability_id}`, { withCredentials: true })
        const url = `/api/admin/availability?ID=${data.availability_id}`
        console.log("URL: ", url)
        axios.delete(url, { withCredentials: true })
            .then((data) => {
                console.log("Si se elimino bien la disponibilidad ", data);
                router.refresh();
            })
            .catch((error) => {
                console.log("No se pudo eliminar la mierda")
                console.log(error)
            })

        console.log(selectedHour)

    }

    function handleMonthChange(year: number, month: number) {
        setLoadingCalendar(true);
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("month", month.toString())
        newSearchParams.set("year", year.toString())
        router.push(`${window.location.pathname}?${newSearchParams.toString()
            }`)
    }

    function handleDayChange(year: number, month: number, day: number) {
        setLoadingDay(true);

        setSelectedDate({ day: day, month: month, year: year });

        const newSearchParams = new URLSearchParams();
        newSearchParams.set("month", month.toString())
        newSearchParams.set("year", year.toString())
        newSearchParams.set("day", day.toString())
        router.push(`${window.location.pathname}?${newSearchParams.toString()} `)
    }

    useEffect(() => {
        setLoadingCalendar(false);
        //changeParams();
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
                <Grid2 size={{ lg: 6, md: 12, xs: 12 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                        <Calendar title={'Seleccione la fecha y horario'} handleDayChange={handleDayChange} datesstate={monthAvailability} isLoading={loadingCalendar} handleMonthChange={handleMonthChange} />
                        <HourSelect onSelect={onHourSelect} data={availableHours} selectedValue='availability_id' control={control} isRequired={true} loading={loadingDay} error={errors?.availability_id ? "Seleccione la hora" : undefined} />
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
                            <FormSummary title='Resumen:' date={selectedDate ? formatDate(selectedDate.day, selectedDate.month, selectedDate.year) : ""} time={selectedHour || ""} />
                        </Box>
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
                                    backgroundColor: COLORS.error
                                }}
                                variant="contained"
                                disabled={selectedHour ? false : true}
                                type="submit">
                                {"Borrar disponibilidad"}
                            </Button>
                        </Box>
                    </Box>
                </Grid2>

            </Grid2>


        </Box>

    )
}

export default CalendarAvailabilityFormComponent
