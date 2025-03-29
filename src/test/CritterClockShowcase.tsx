import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Switch,
    FormControlLabel,
    Chip,
    Divider,
    IconButton,
    Grid,
    Paper,
    Tabs,
    Tab,
    Tooltip, SelectChangeEvent
} from '@mui/material';
import {LeafButton, TanButton} from '../styles/useStyles';

// NOTE: import these icons, these are placeholders for the example
const FishIcon = () => <span role="img" aria-label="fish">🐟</span>;
const BugIcon = () => <span role="img" aria-label="bug">🦋</span>;
const ClockIcon = () => <span role="img" aria-label="clock">🕒</span>;
const SeasonIcon = () => <span role="img" aria-label="season">🍃</span>;
const InfoIcon = () => <span role="img" aria-label="info">ℹ️</span>;

const CritterClockShowcase: React.FC = () => {
    const [selectedCritter, setSelectedCritter] = useState<string>('');
    const [hemisphere, setHemisphere] = useState<string>('');
    const [showRare, setShowRare] = useState<boolean>(true);
    const [tabValue, setTabValue] = useState<number>(0);

    const handleCritterChange = (e: SelectChangeEvent<string>) => {
        setSelectedCritter(e.target.value);
    };

    const handleHemisphereChange = (e: SelectChangeEvent<string>) => {
        setHemisphere(e.target.value);
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Sample fish data
    const fishData = [
        { name: 'Sea Bass', rarity: 'Common', time: 'All Day', location: 'Sea', value: 400 },
        { name: 'Koi', rarity: 'Uncommon', time: '4PM-9AM', location: 'Pond', value: 4000 },
        { name: 'Oarfish', rarity: 'Rare', time: 'All Day', location: 'Sea', value: 9000 },
    ];

    return (
        <Box sx={{ maxWidth: 1000, margin: '0 auto', p: 2 }}>
            <Paper
                elevation={0}
                sx={{
                    backgroundColor: 'background.alt',
                    p: 2,
                    borderRadius: 3,
                    mb: 3,
                    border: '2px dashed',
                    borderColor: 'primary.light'
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    🏝️ Welcome to CritterClock!
                </Typography>
                <Typography variant="body1">
                    Find the perfect time to catch fish and bugs in Animal Crossing: New Horizons!
                </Typography>
            </Paper>

            {/* Header with main title */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h2" component="h1" sx={{ fontWeight: 800, color: 'text.primary' }}>
                    CritterClock
                </Typography>
                <Chip
                    label="New Horizons"
                    color="secondary"
                    sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}
                />
            </Box>

            {/* Filter Controls */}
            <Card sx={{ mb: 4 }}>
                <CardHeader
                    title="Find Your Critters"
                    sx={{
                        backgroundColor: 'primary.light',
                        color: 'white',
                        '& .MuiCardHeader-title': {
                            fontWeight: 'bold'
                        }
                    }}
                />
                <CardContent>
                    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                        <Box width={{ xs: '100%', sm: '48%', md: '23%' }}>
                            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                <InputLabel id="critter-type-label">Critter Type</InputLabel>
                                <Select
                                    labelId="critter-type-label"
                                    value={selectedCritter}
                                    onChange={handleCritterChange}
                                    label="Critter Type"
                                >
                                    <MenuItem value="fish">
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <FishIcon /> <Box sx={{ ml: 1 }}>Fish</Box>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="bugs">
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <BugIcon /> <Box sx={{ ml: 1 }}>Bugs</Box>
                                        </Box>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box width={{ xs: '100%', sm: '48%', md: '23%' }}>
                            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                <InputLabel id="hemisphere-label">Hemisphere</InputLabel>
                                <Select
                                    labelId="hemisphere-label"
                                    value={hemisphere}
                                    onChange={handleHemisphereChange}
                                    label="Hemisphere"
                                >
                                    <MenuItem value="north">Northern</MenuItem>
                                    <MenuItem value="south">Southern</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box width={{ xs: '100%', sm: '48%', md: '23%' }}>
                            <TextField
                                fullWidth
                                label="Search Critters"
                                variant="outlined"
                                placeholder="e.g. Oarfish"
                            />
                        </Box>

                        <Box width={{ xs: '100%', sm: '48%', md: '23%' }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={showRare}
                                        onChange={() => setShowRare(!showRare)}
                                        color="primary"
                                    />
                                }
                                label="Show Rare Only"
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ClockIcon />}
                        >
                            Find Best Times
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Tabs for different views */}
            <Box sx={{ mb: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="critter view tabs"
                    sx={{
                        '& .MuiTab-root': {
                            fontWeight: 'bold',
                        },
                        '& .Mui-selected': {
                            color: 'primary.main',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'primary.main',
                        }
                    }}
                >
                    <Tab label="Available Now" icon={<ClockIcon />} iconPosition="start" />
                    <Tab label="All Critters" icon={<FishIcon />} iconPosition="start" />
                    <Tab label="By Season" icon={<SeasonIcon />} iconPosition="start" />
                </Tabs>
            </Box>

            {/* Main Content */}
            <Box role="tabpanel" hidden={tabValue !== 0}>
                {tabValue === 0 && (
                    <Card>
                        <CardHeader
                            title="Critters Available Right Now"
                            subheader="Based on your current time"
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                        />
                        <CardContent>
                            <Grid container spacing={3}>
                                {fishData.map((fish) => (
                                    <Box key={fish.name} width={{ xs: '100%', sm: '48%', md: '23%' }}>
                                        <Card sx={{ height: '100%' }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                    <Typography variant="h6">{fish.name}</Typography>
                                                    <Tooltip title="Current availability information" arrow>
                                                        <IconButton size="small">
                                                            <InfoIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                                <Divider sx={{ my: 1 }} />
                                                <Typography variant="body2">Location: {fish.location}</Typography>
                                                <Typography variant="body2">Active Time: {fish.time}</Typography>
                                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Chip
                                                        label={fish.rarity}
                                                        color={
                                                            fish.rarity === 'Common' ? 'info' :
                                                                fish.rarity === 'Uncommon' ? 'warning' : 'secondary'
                                                        }
                                                        size="small"
                                                    />
                                                    <Typography variant="body2" fontWeight="bold">
                                                        {fish.value} Bells
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                )}
            </Box>

            {/* Bottom action buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button variant="outlined" color="secondary">
                    Settings
                </Button>
                <LeafButton>
                    Add to Critterpedia
                </LeafButton>
                <TanButton>
                    Museum Donations
                </TanButton>
                <Button variant="contained" color="primary">
                    Share Results
                </Button>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    mt: 6,
                    pt: 2,
                    borderTop: 1,
                    borderColor: 'divider',
                    textAlign: 'center'
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    CritterClock ©️ {new Date().getFullYear()} - Made with 🌱 for Animal Crossing fans
                </Typography>
            </Box>
        </Box>
    );
};

export default CritterClockShowcase;
