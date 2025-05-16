import { useState } from 'react';
import {FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material';

const MonthSelect = () => {
    const currentMonth = new Date().getMonth();
    const [month, setMonth] = useState(currentMonth);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
                labelId="month-select-label"
                id="month-select"
                value={month}
                label="Month"
                onChange={(e) => setMonth(e.target.value as number)}
            >
                {months.map((monthName, index) => (
                    <MenuItem key={index} value={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ ml: 1 }}>{monthName}</Box>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MonthSelect;
