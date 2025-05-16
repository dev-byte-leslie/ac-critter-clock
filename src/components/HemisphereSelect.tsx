import  {useState} from "react";
import {Box, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";

const HemisphereSelect = () => {
    const [hemisphere, setHemisphere] = useState('north');


    return(
        <Grid size={{xs: 12, sm:6, md:3}}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="hemisphere-label">Hemisphere</InputLabel>
                <Select
                    labelId="hemisphere-label"
                    value={hemisphere}
                    onChange={(e) => setHemisphere(e.target.value)}
                    label="Hemisphere"
                >
                    <MenuItem value="north">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ ml: 1 }}>Northern</Box>
                        </Box>
                    </MenuItem>
                    <MenuItem value="south">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ ml: 1 }}>Southern</Box>
                        </Box>
                    </MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
}

export default HemisphereSelect;
