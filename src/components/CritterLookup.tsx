import { loadFishList } from '../services/FishList.ts';
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import { Fish } from '../types/Fish';

const CritterLookup = () => {
    const [fishList, setFishList] = useState<Fish[]>([]);

    useEffect(() => {
        console.log(fishList);
    }, [fishList]);

    const handleButtonClick = async () => {
        const fishData = await loadFishList();
        setFishList(fishData);
    }

    return (
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
            Data Test
        </Button>
    );
};

export default CritterLookup
