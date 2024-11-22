import { Box } from "@mui/material"


// function formatDate(day: number, month: number, year: number): string {
//     const months = [
//         "January", "February", "March", "April", "May", "June",
//         "July", "August", "September", "October", "November", "December"
//     ];

//     const monthString = months[month - 1]; // Adjust for zero-based index
//     return `${day.toString()} ${monthString} ${year}`;
// }

// function selectHour(
//     availabilityList: DayHourAvailabilityItem[],
//     targetHour: string
// ): DayHourAvailabilityItem[] {
//     return availabilityList.map(item => {
//         if (item.state === "selected") {
//             return { ...item, state: "available" }; // Deselect currently selected item
//         }
//         if (item.hour === targetHour) {
//             return { ...item, state: "selected" }; // Select the target hour
//         }
//         return item;
//     });
// }

// function deSelectHour(
//     availabilityList: DayHourAvailabilityItem[]
// ): DayHourAvailabilityItem[] {
//     return availabilityList.map(item =>
//         item.state === "selected"
//             ? { ...item, state: "available" }
//             : item
//     );
// }

// const dayAvailability: DayHourAvailabilityItem[] = Array.from({ length: 24 }, (_, i) => {
//     const hour12 = i % 12 === 0 ? 12 : i % 12;
//     const period = i < 12 ? "am" : "pm";
//     const hourStr = `${hour12}:00 ${period}`;
//     return {
//         state: "available",
//         hour: hourStr,
//         document_id: hourStr
//     };
// });

const AddAvailabilityFormComponent = () => {

    // const router = useRouter();
    // const [loadingCalendar, setLoadingCalendar] = useState<boolean>(false);
    // const [loadingDay, setLoadingDay] = useState<boolean>(false);
    // const [availableHours, setAvailableHours] = useState<DayHourAvailabilityItem[]>([]);
    // const [selectedHour, setSelectedHour] = useState<string | null>(null);
    // const [selectedDate, setSelectedDate] = useState<dateNumbers | null>(null);

    // const onHourSelect = (hour: string) => {
    //     if (selectedHour == hour) {
    //         setAvailableHours(deSelectHour(availableHours))
    //         setSelectedHour(null)
    //     } else {
    //         setAvailableHours(selectHour(availableHours, hour))
    //         setSelectedHour(hour)
    //     }
    // }

    // const onSubmit = async () => {
    //     // const res = await axios.post(`/api/appointment`, data)

    //     // const res_data = res.data
    //     // console.log("------")
    //     // console.log(res_data)


    //     console.log(selectedHour)

    // }

    // function handleDayChange(year: number, month: number, day: number) {
    //     console.log(day, month, year)
    // }


    return (
        <Box
        >
            pichaaa
            {/* <Grid2 container >
                <Grid2 size={{ lg: 6, md: 12, xs: 12 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                        <Calendar title={'Seleccione la fecha y horario'} handleDayChange={handleDayChange} datesstate={[]} isLoading={false} handleMonthChange={() => { }} />
                        <HourSelect onSelect={onHourSelect} data={availableHours} selectedValue='availability_id' control={null} isRequired={true} loading={loadingDay} />
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
                        backgroundColor: COLORS.error
                    }}
                    variant="contained"
                >
                    {"Borrar disponibilidad"}
                </Button>
            </Box> */}


        </Box>

    )
}

export default AddAvailabilityFormComponent
