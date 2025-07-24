import { FormControl, InputLabel, Select, MenuItem, Box, Grid } from '@mui/material';

interface MonthSelectProps {
    value: number;
    onChange: (value: number) => void;
}

const MonthSelect = ({ value, onChange }: MonthSelectProps) => {
    const months = [ //TODO: move month[] out since used multiple files
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <Grid size={{xs: 12, sm:6, md:3}}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                    labelId="month-select-label"
                    id="month-select"
                    value={value}
                    label="Month"
                    onChange={(e) => onChange(e.target.value as number)}
                >
                    {months.map((monthName, index) => (
                        //add one to index, since value represents months, and they are not 0 based.
                        <MenuItem key={index} value={index + 1}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ ml: 1 }}>{monthName}</Box>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default MonthSelect;
