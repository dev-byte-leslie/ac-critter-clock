import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    CircularProgress
} from '@mui/material';
import CritterOption from './CritterOption';
import { Fish } from '../types/Fish';

interface CritterSelectProps {
    selectedCritter: Fish | null; //TODO: generic critter type
    onCritterChange: (critter: Fish | null) => void; //TODO: generic critter type
    label: string;
    critterList: Fish[]; //TODO: generic critter type
    loading: boolean;
}

const CritterSelect = ({
                           selectedCritter,
                           onCritterChange,
                           label,
                           critterList,
                           loading
                       }: CritterSelectProps) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedNumber = event.target.value;
        const critter = critterList.find(c => c.number.toString() === selectedNumber) || null;
        onCritterChange(critter);
    };

    return (
        <FormControl fullWidth variant="outlined" disabled={loading}>
            <InputLabel id="critter-select-label">{label}</InputLabel>
            <Select
                labelId="critter-select-label"
                value={selectedCritter?.number.toString() || ''}
                onChange={handleChange}
                label={label}
                renderValue={(selected) => {
                    if (!selected || !selectedCritter) return '';
                    return (
                        <CritterOption
                            imageUrl={selectedCritter.image_url}
                            name={selectedCritter.name}
                            imageSize={24}
                        />
                    );
                }}
            >
                {loading ? (
                    <MenuItem disabled>
                        <CircularProgress size={24} />
                    </MenuItem>
                ) : (
                    critterList.map((critter) => (
                        <MenuItem key={critter.number} value={critter.number.toString()}>
                            <CritterOption
                                imageUrl={critter.image_url}
                                name={critter.name}
                                imageSize={32}
                            />
                        </MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    );
};

export default CritterSelect;
