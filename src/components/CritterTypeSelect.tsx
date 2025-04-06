import { useState } from "react";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { FishIcon, BugIcon, SeaIcon} from "../assets/icons.tsx";

const HemisphereSelect = () => {
    const [selectedCritter, setSelectedCritter] = useState('fish');

    return(
        <Grid size={{xs: 12, sm:6, md:3}}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="critter-type-label">Critter Type</InputLabel>
                <Select
                    labelId="critter-type-label"
                    value={selectedCritter}
                    onChange={(e) => setSelectedCritter(e.target.value)}
                    label="Critter Type"
                >
                    <MenuItem value="fish">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FishIcon /> <Box sx={{ ml: 1 }}>Fish</Box>
                        </Box>
                    </MenuItem>
                    <MenuItem disabled value="bugs">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BugIcon /> <Box sx={{ ml: 1 }}>Bugs</Box>
                        </Box>
                    </MenuItem>
                    <MenuItem disabled value="sea">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SeaIcon /> <Box sx={{ ml: 1 }}>Sea Creatures</Box>
                        </Box>
                    </MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
}

export default HemisphereSelect;
