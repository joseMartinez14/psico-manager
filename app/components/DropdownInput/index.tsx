import { Controller } from 'react-hook-form';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { COLORS } from '@/utils/Contants';

interface DropdownInputProps {
  control: any;
  title?: string;
  data: string[];
  value: string;
  error?: string;
  placeholder?: string;
  styles?: any;
  selectStyles?: any;
  isRequired: boolean;
  icon?: any;
}

const DropdownInput = (props: DropdownInputProps) => {
  const { control, title, value, error, isRequired, placeholder, styles, data, selectStyles, icon } = props;

  return (
    <Box sx={styles}>
      <Controller
        name={value}
        control={control}
        rules={{ required: isRequired }}
        render={({ field: { onChange, value } }) => (
          <>
            {title && (
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                  color: COLORS.black,
                  fontSize: '18px',
                  margin: 0,
                  padding: 0,
                  fontWeight: 500,
                }}>
                {title}
              </Typography>
            )}
            <Select
              IconComponent={icon}
              error={Boolean(error)}
              inputProps={{
                'aria-label': error,
              }}
              labelId={value}
              id={value}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              sx={{
                width: '100%',
                color: COLORS.secondary,
                borderColor: COLORS.neutral400,
                backgroundColor: COLORS.neutral100,
                height: '49px',
                '&>svg': {
                  color: COLORS.neutral400,
                },
                '& .MuiSelect-iconOpen': {
                  transform: 'none',
                },
                textAlign: 'left',
                ...selectStyles,
              }}>
              {data.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{
                color: COLORS.error,
                fontSize: '0.75rem',
                margin: 0,
                padding: 0,
                fontWeight: 400,
                lineHeight: '1.66',
                letterSpacing: '0.03333em',
                paddingLeft: '15px',
                paddingTop: '3px',
              }}>
              {error}
            </Typography>
          </>
        )}
      />
    </Box>
  );
};

export default DropdownInput;
