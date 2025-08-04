import { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    Paper,
    CircularProgress,
    Switch,
} from "@mui/material";
import { loadFishList } from "../services/FishList.ts";
import HemisphereSelect from "./HemisphereSelect.tsx";
import MonthSelect from "./MonthSelect.tsx";
import CritterTypeSelect from "./CritterTypeSelect.tsx";
import CritterSelect from "./CritterSelect.tsx";
import {Fish} from "../types/Fish.ts";
import {filterFish} from "../utility/filterFish.ts";

const CritterFinder = () => {
    type ResultsType = {
        critterType: string;
        hemisphere: string;
        month: number;
        critter: Fish | null; //TODO: generic critter type
    } | null;

    // State management
    const [critterList, setCritterList] = useState<Fish[]>([]); //TODO: generic critter type
    const [selectedCritterType, setSelectedCritterType] = useState('');
    const [hemisphere, setHemisphere] = useState('north');
    const [month, setMonth] = useState(new Date().getMonth());
    const [raining, setRaining] = useState(false);

    const [critter, setCritter] = useState<Fish | null>(null); //TODO: generic critter type

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ResultsType>(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (!selectedCritterType) return;

        const fetchCritterList = async () => {
            setLoading(true);
            try {
                let data : Fish[] = []; ///TODO: generic critter type

                switch (selectedCritterType) {
                    case 'fish':
                        data = await loadFishList();
                        break;
                    case 'bugs':
                        // TODO: update when bugs service implemented
                        console.log("Bugs service not implemented yet");
                        break;
                    case 'sea':
                        // TODO: update when sea creature service implemented
                        console.log("Sea creatures service not implemented yet");
                        break;
                    default:
                        data = [];
                }

                setCritterList(data);
            } catch (error) {
                console.error("Error fetching critter list:", error);
                setCritterList([]); //TODO: display friendly error to user
            } finally {
                setLoading(false);
            }
        };

        fetchCritterList();
    }, [selectedCritterType]);

    //Handle lookup button click
    const handleLookup = () => {
        if (!selectedCritterType || !hemisphere || month === undefined) return;

        setResults({
            critterType: selectedCritterType,
            hemisphere: hemisphere,
            month: month,
            critter: critter
        });

        setShowResults(true);
        if (critter) {
            filterFish(critterList, critter, raining, hemisphere, month);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Critter Finder
            </Typography>

            <Grid container spacing={2}>
                <HemisphereSelect
                    value={hemisphere}
                    onChange={setHemisphere}
                />
                <MonthSelect
                    value={month}
                    onChange={setMonth}
                />
                <CritterTypeSelect
                    value={selectedCritterType}
                    onChange={setSelectedCritterType}
                />
            </Grid>

            <Switch
                checked={raining}
                onChange={(event) => setRaining(event.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            raining

            {/* Conditional Critter Select */}
            {selectedCritterType && hemisphere && month !== undefined && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                {loading ? (
                <Grid size={{xs: 12, sm:6, md:3}}>
                <CircularProgress size={32} />
            </Grid>
        ) : (
            <>
                    <Grid size={{xs: 12, sm:6, md:3}}>
                        <CritterSelect
                            critterList={critterList}
                            selectedCritter={critter}
                            onCritterChange={setCritter}
                            label={`Select ${selectedCritterType.charAt(0).toUpperCase() + selectedCritterType.slice(1)}`}
                            loading={loading}
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 4}}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ height: '56px' }}
                            onClick={handleLookup}
                            disabled={!selectedCritterType || !hemisphere || month === undefined}
                        >
                            Look Up
                        </Button>
                    </Grid>
                    </>
                    )}
                </Grid>
            )}

            {/* Results Display //TODO: remove when recs implemented*/}
            {showResults && results && (
                <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Critter Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 4}}>
                            <Typography variant="body2" color="text.secondary">
                                Name
                            </Typography>
                            <Typography variant="body1">
                                {results.critter?.name || 'No critter selected'}
                            </Typography>
                        </Grid>
                        <Grid size={{xs: 4}}>
                            <Typography variant="body2" color="text.secondary">
                                Hemisphere
                            </Typography>
                            <Typography variant="body1">
                                {results.hemisphere === 'north' ? 'Northern' : 'Southern'}
                            </Typography>
                        </Grid>
                        <Grid size={{xs: 4}}>
                            <Typography variant="body2" color="text.secondary">
                                Month
                            </Typography>
                            <Typography variant="body1">
                                {['January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'][results.month]}
                            </Typography>
                        </Grid>
                        <Grid size={{xs: 12}} sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Critter Details
                            </Typography>
                            <Box sx={{ mt: 1, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                                <pre style={{ margin: 0, overflow: 'auto' }}>
                                    {JSON.stringify(results.critter, null, 2)}
                                </pre>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Box>
    );
};

export default CritterFinder;
