import { loadFishList } from '../services/FishList.tsx';
import {Button} from "@mui/material";
import {useState} from "react";
import { Fish } from '../types/Fish';

const CritterLookup = () => {
    const [fishList, setFishList] = useState<Fish[]>([]);

    const handleButtonClick = async () => {
        const fishData = await loadFishList();
        setFishList(fishData);
    };

    return (
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
            Data Test
        </Button>
    );
};

export default CritterLookup
