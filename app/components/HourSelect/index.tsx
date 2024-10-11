import { Grid2, Typography } from '@mui/material';
import React from 'react'
import HourSelectItem from '../HourSelectItem';
import { Controller } from 'react-hook-form';
import { COLORS } from '@/utils/Contants';
import { DayHourAvailabilityItem } from '@/utils/Types';

interface HourSelectProps {
    data: DayHourAvailabilityItem[];
    selectedValue: string;
    control: any;
    isRequired: boolean;
    error?: string;
}

const HourSelect = (props: HourSelectProps) => {

    const { data, selectedValue, control, isRequired, error } = props;

    return (
        <div>

            <Controller
                name={selectedValue}
                control={control}
                rules={{ required: isRequired }}
                render={({ field: { onChange, value } }) => (
                    <>
                        <Grid2 container spacing={2}>
                            {data.map((item) => (
                                <Grid2 size={{ lg: 2, md: 3 }}>
                                    <HourSelectItem onChange={onChange} hourValue={item.hour} width={150} height={50} state={item.state} fontSize={25} />
                                </Grid2>
                            ))}
                        </Grid2>

                        <Typography
                            sx={{
                                color: COLORS.error,
                                fontSize: '0.75rem',
                                margin: 0,
                                padding: 0,
                                fontWeight: 400,
                                paddingLeft: '15px',
                                paddingTop: '3px',
                            }}>
                            {error}
                        </Typography>
                    </>
                )}
            />
        </div>
    )
}

export default HourSelect