
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect } from 'react';
import CompoExample from '../components/CompoExample';
import DropdownSelect from '../components/DropdownSelect';
import HourSelectItem from '../components/HourSelectItem';
import HourSelect from '../components/HourSelect';
import { useForm } from 'react-hook-form';
import { SetAppoitmentForm } from './type';
import { Box, Button } from '@mui/material';
import { DayHourAvailabilityItem } from '@/utils/Types';
import Calendar from '../components/Calendar';

const callApi = async () => {
    const res = await fetch(
        'http://localhost:1337/api/availabilities',
    )

    const avail = await res.json()

    console.log("*****")
    console.log(avail)
}

export default async function BasicDateCalendar() {

    // const {
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<SetAppoitmentForm>();

    // const onSubmit = (data: SetAppoitmentForm) => {
    //     console.log("*****")
    //     console.log(data)
    // }

    const fetchData = async () => {
        const availData = await fetch("http://localhost:3000/api/availability/month?month=09&year=2024");
        console.log("-**-*-*-")
        console.log(availData)
        const availItems = await availData.json()
        console.log(availItems)

        return availItems;
    }

    const monthAvailData = await fetchData();

    // const availData = fetch()

    const testData: DayHourAvailabilityItem[] = [
        {
            hour: "8:00 am",
            state: "selected"
        },
        {
            hour: "9:00 am",
            state: "unavailable"
        },
        {
            hour: "10:00 am",
            state: "available"
        },
        {
            hour: "11:00 am",
            state: "selected"
        },
    ]

    return (
        <div style={{ backgroundColor: 'white' }}>
            <CompoExample />
            <DropdownSelect />
            <br />
            <br />
            <Calendar datesstate={monthAvailData} isLoading={false} />

            <br />
            {/* <Box
                component="form"
                autoComplete="on"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ pt: 0, pb: 0 }}>

                <HourSelect
                    control={control}
                    data={testData}
                    selectedValue="appointmentHour"
                    isRequired={true}
                    error={errors.appointmentHour ? "Seleccione una hora para su cita" : undefined}
                />

                <Button
                    sx={{
                        my: 5,
                        height: 48,
                        fontSize: '16px',
                        fontWeight: 500,
                    }}
                    variant="contained"
                    type="submit">
                    {"Agregar/Modificar Producto"}
                </Button>
            </Box> */}


            <br />
            <br />
            <br />
            <br />

            <br />
            <br />
            <br />
            <br />



        </div>
    );
}