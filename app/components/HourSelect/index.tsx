import { Box, Grid2, Typography } from '@mui/material';
import React from 'react'
import HourSelectItem from '../HourSelectItem';
import { Controller } from 'react-hook-form';
import { COLORS } from '@/utils/Contants';
import { DayHourAvailabilityItem } from '@/utils/Types';
import { BeatLoader } from 'react-spinners';

interface HourSelectProps {
    data: DayHourAvailabilityItem[];
    selectedValue: string;
    control: any;
    isRequired: boolean;
    error?: string;
    loading: boolean;
    onSelect: (hourValue: string) => void;
}

const HourSelect = (props: HourSelectProps) => {

    const { data, selectedValue, control, isRequired, error, loading, onSelect } = props;

    return (
        <Box >
            <BeatLoader loading={loading} />
            <Controller
                name={selectedValue}
                control={control}
                rules={{ required: isRequired }}
                render={({ field: { onChange, value } }) => (
                    <>
                        <Grid2 container spacing={5} >
                            {data.map((item) => (
                                <Grid2 >
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