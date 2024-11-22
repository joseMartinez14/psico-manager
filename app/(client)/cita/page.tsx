import "@fontsource/montserrat-alternates/400.css"

import CitaFormComponent from './FormComponents';
import { Box, Typography } from '@mui/material';


interface QueryParams {
    month?: string;
    year?: string;
    day?: string;
}

const getMonthAvailability = async (month: string | null | undefined, year: string | null | undefined) => {
    let url = ""
    if (month && year) {
        url = `${process.env.MY_API_URL}/availability/month?month=${month}&year=${year}`
    } else {
        url = `${process.env.MY_API_URL}/availability/month`
    }
    const res = await fetch(url, { cache: 'no-store' })
    const avail = await res.json()
    return avail;
}

const getBasicGet = async (relative_path: string) => {
    const res = await fetch(`${process.env.MY_API_URL}/${relative_path}`)
    const avail = await res.json()
    return avail;
}

const getDayAvailability = async (month: string | null | undefined, year: string | null | undefined, day: string | null | undefined) => {
    let url = ""
    if (month && year && day) {
        url = `${process.env.MY_API_URL}/availability/day?month=${month}&year=${year}&day=${day}`
    } else {
        url = `${process.env.MY_API_URL}/availability/day`
    }
    const res = await fetch(url, { cache: 'no-store' })
    const avail = await res.json()
    return avail;
}

export default async function appointmentPage({ searchParams }: { searchParams: QueryParams }) {

    // callApi();

    //1. agarrar ka informacion que necesito
    //1.1 la disponibilidad de los dias
    //1.2 pedir los datos del dia especifico basado en los parametros del url
    //2. Mandarlos como props a los componentes 

    //const searchParams = useSearchParams();
    const { month, year, day } = searchParams;


    const monthAvailability = await getMonthAvailability(month, year);
    const dayAvailability = await getDayAvailability(month, year, day);
    const appointmentTypes = await getBasicGet("appointmenttype");
    const appointmentModes = await getBasicGet("mode");




    return (
        <>
            <Box
                sx={{
                    width: {
                        xs: '96%',
                        sm: '90%',
                        md: '70%',
                        lg: '65%',
                        xl: '60%'
                    },
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '20px',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pb: 4
                }}>
                    <Typography
                        variant='h2'
                        sx={{
                            fontSize: 36,
                            textAlign: 'center',
                            verticalAlign: 'center',
                            fontFamily: ["Montserrat Alternates"].join(","),
                            fontStyle: "cursive",
                            margin: 0,
                            padding: 0,
                            fontWeight: 300,
                        }}>
                        {"Reserva tu cita"}
                    </Typography>

                </Box>
                <CitaFormComponent appointmentModes={appointmentModes} appointmentTypes={appointmentTypes} monthAvailability={monthAvailability} dayAvailability={dayAvailability} />
            </Box>
        </>
    );
}