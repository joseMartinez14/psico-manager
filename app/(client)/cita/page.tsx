import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect } from 'react';
import { Suspense } from 'react';

import DateCalendarServerRequest from '@/app/components/CalendarExample';
import CompoExample from '@/app/components/CompoExample';

/*
const callApi = async () => {
    const res = await fetch(
        'http://localhost:1337/api/availabilities',
    )

    const avail = await res.json()

    console.log("*****")
    console.log(avail)
}
*/
export default async function appointmentPage() {

    // callApi();

    //1. agarrar ka informacion que necesito
    //1.1 la disponibilidad de los dias
    //1.2 pedir los datos del dia especifico basado en los parametros del url
    //2. Mandarlos como props a los componentes 





    return (
        <>
            <div style={{ backgroundColor: 'white' }}>
            </div>



        </>
    );
}