import { Box, Grid2, Typography } from '@mui/material';
import React from 'react'
import HourSelectItem from '../HourSelectItem';
import { Controller } from 'react-hook-form';
import { COLORS } from '@/utils/Contants';
import { DayHourAvailabilityItem } from '@/utils/Types';
import { BeatLoader } from 'react-spinners';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HourSelectProps {
    data: DayHourAvailabilityItem[];
    selectedValue: string;
    control: any;
    isRequired: boolean;
    error?: string;
    loading: boolean;
    onSelect: (hourValue: string) => void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const HourSelect = (props: HourSelectProps) => {

    const { data, selectedValue, control, isRequired, error, loading, onSelect } = props;

    return (
        <Box >
            <BeatLoader loading={loading} />
            <Controller
                name={selectedValue}
                control={control}
                rules={{ required: isRequired }}
                render={({ field: { onChange } }) => (
                    <>
                        <Grid2 container spacing={5} >
                            {data.map((item) => (
                                <Grid2 key={item.document_id} >
                                    <HourSelectItem onSelect={onSelect} onChange={onChange} id={item.document_id} hourValue={item.hour} width={80} height={30} state={item.state} fontSize={16} />
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
        </Box>
    )
}

export default HourSelect