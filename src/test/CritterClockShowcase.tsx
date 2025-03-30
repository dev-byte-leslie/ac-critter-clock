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
    Tooltip,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Pagination,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    LinearProgress,
    Rating,
    Slider,
    ToggleButton,
    ToggleButtonGroup,
    Stack,
    Alert,
    AlertTitle,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Backdrop,
    CircularProgress
} from '@mui/material';
import {LeafButton, TanButton} from "../styles/useStyles.ts";

// NOTE: Import actual icons, not emojis.
const FishIcon = () => <span role="img" aria-label="fish">🐟</span>;
const BugIcon = () => <span role="img" aria-label="bug">🦋</span>;
const ClockIcon = () => <span role="img" aria-label="clock">🕒</span>;
const SeasonIcon = () => <span role="img" aria-label="season">🍃</span>;
const InfoIcon = () => <span role="img" aria-label="info">ℹ️</span>;
const ExpandMoreIcon = () => <span role="img" aria-label="expand">⬇️</span>;
const FavoriteIcon = () => <span role="img" aria-label="favorite">❤️</span>;
const SpringIcon = () => <span role="img" aria-label="spring">🌸</span>;
const SummerIcon = () => <span role="img" aria-label="summer">☀️</span>;
const FallIcon = () => <span role="img" aria-label="fall">🍂</span>;
const WinterIcon = () => <span role="img" aria-label="winter">❄️</span>;

const CritterClockShowcase = () => {
    const [selectedCritter, setSelectedCritter] = useState('fish');
    const [hemisphere, setHemisphere] = useState('north');
    const [showRare, setShowRare] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const [alignment, setAlignment] = useState('list');
    const [loading, setLoading] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState('spring');
    const [valueRange, setValueRange] = useState([0, 15000]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleAlignmentChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const handleSeasonChange = (event: React.MouseEvent<HTMLElement>, newSeason: string | null) => {
        if (newSeason !== null) {
            setSelectedSeason(newSeason);
        }
    };

    const handleValueRangeChange = (event: Event, newValue: number | number[]) => {
        setValueRange(newValue as number[]);
    };

    const simulateLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    // Sample fish data
    const fishData = [
        { name: 'Sea Bass', rarity: 'Common', time: 'All Day', location: 'Sea', value: 400, seasons: ['spring', 'summer', 'fall', 'winter'] },
        { name: 'Koi', rarity: 'Uncommon', time: '4PM-9AM', location: 'Pond', value: 4000, seasons: ['spring', 'summer'] },
        { name: 'Oarfish', rarity: 'Rare', time: 'All Day', location: 'Sea', value: 9000, seasons: ['winter', 'spring'] },
        { name: 'Goldfish', rarity: 'Uncommon', time: 'All Day', location: 'Pond', value: 1300, seasons: ['spring', 'summer', 'fall', 'winter'] },
        { name: 'Barred Knifejaw', rarity: 'Rare', time: 'All Day', location: 'Sea', value: 5000, seasons: ['spring', 'summer'] },
        { name: 'Tuna', rarity: 'Rare', time: 'All Day', location: 'Pier', value: 7000, seasons: ['fall', 'winter'] }
    ];

    // Sample bug data
    const bugData = [
        { name: 'Common Butterfly', rarity: 'Common', time: '4AM-7PM', location: 'Flying', value: 160, seasons: ['spring', 'summer'] },
        { name: 'Emperor Butterfly', rarity: 'Uncommon', time: '5PM-8AM', location: 'Flying', value: 4000, seasons: ['summer', 'fall'] },
        { name: 'Scorpion', rarity: 'Rare', time: '7PM-4AM', location: 'Ground', value: 8000, seasons: ['summer', 'fall'] }
    ];

    const getAllCrittersData = () => {
        return selectedCritter === 'fish' ? fishData : bugData;
    };

    const getSeasonalCritters = () => {
        return (selectedCritter === 'fish' ? fishData : bugData).filter(
            critter => critter.seasons.includes(selectedSeason)
        );
    };

    const getSeasonIcon = (season: string) => {
        switch(season) {
            case 'spring': return <SpringIcon />;
            case 'summer': return <SummerIcon />;
            case 'fall': return <FallIcon />;
            case 'winter': return <WinterIcon />;
            default: return <SpringIcon />;
        }
    };

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
                    <Grid container spacing={3}>
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
                                    <MenuItem value="bugs">
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <BugIcon /> <Box sx={{ ml: 1 }}>Bugs</Box>
                                        </Box>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{xs: 12, sm:6, md:3}}>
                            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                <InputLabel id="hemisphere-label">Hemisphere</InputLabel>
                                <Select
                                    labelId="hemisphere-label"
                                    value={hemisphere}
                                    onChange={(e) => setHemisphere(e.target.value)}
                                    label="Hemisphere"
                                >
                                    <MenuItem value="north">Northern</MenuItem>
                                    <MenuItem value="south">Southern</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{xs: 12, sm:6, md:3}}>
                            <TextField
                                fullWidth
                                label="Search Critters"
                                variant="outlined"
                                placeholder="e.g. Oarfish"
                            />
                        </Grid>

                        <Grid size={{xs: 12, sm:6, md:3}}>
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
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ClockIcon />}
                            onClick={simulateLoading}
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
                                    <Grid size={{xs:12, sm:6, md:4}} key={fish.name}>
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
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                )}
            </Box>

            {/* All Critters Tab Content */}
            <Box role="tabpanel" hidden={tabValue !== 1}>
                {tabValue === 1 && (
                    <Card>
                        <CardHeader
                            title={`All ${selectedCritter === 'fish' ? 'Fish' : 'Bugs'}`}
                            subheader={`Complete catalog of collectible ${selectedCritter}`}
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                            action={
                                <ToggleButtonGroup
                                    value={alignment}
                                    exclusive
                                    onChange={handleAlignmentChange}
                                    aria-label="view mode"
                                    size="small"
                                >
                                    <ToggleButton value="list" aria-label="list view">
                                        List
                                    </ToggleButton>
                                    <ToggleButton value="grid" aria-label="grid view">
                                        Grid
                                    </ToggleButton>
                                    <ToggleButton value="table" aria-label="table view">
                                        Table
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            }
                        />
                        <CardContent>
                            <Box sx={{ mb: 3 }}>
                                <Alert severity="info" variant="outlined">
                                    <AlertTitle>Critter Value Range</AlertTitle>
                                    Filter critters by value (Bells)
                                </Alert>
                                <Box sx={{ px: 2, mt: 2 }}>
                                    <Slider
                                        value={valueRange}
                                        onChange={handleValueRangeChange}
                                        valueLabelDisplay="on"
                                        min={0}
                                        max={15000}
                                        step={500}
                                        marks={[
                                            { value: 0, label: '0' },
                                            { value: 5000, label: '5k' },
                                            { value: 10000, label: '10k' },
                                            { value: 15000, label: '15k' }
                                        ]}
                                    />
                                </Box>
                            </Box>

                            {alignment === 'list' && (
                                <List sx={{ width: '100%' }}>
                                    {getAllCrittersData()
                                        .filter(critter => critter.value >= valueRange[0] && critter.value <= valueRange[1])
                                        .map((critter) => (
                                            <ListItem
                                                key={critter.name}
                                                divider
                                                secondaryAction={
                                                    <Box>
                                                        <Chip
                                                            label={`${critter.value} Bells`}
                                                            color="primary"
                                                            size="small"
                                                            sx={{ mr: 1 }}
                                                        />
                                                        <IconButton edge="end">
                                                            <FavoriteIcon />
                                                        </IconButton>
                                                    </Box>
                                                }
                                            >
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: selectedCritter === 'fish' ? 'primary.light' : 'secondary.light' }}>
                                                        {selectedCritter === 'fish' ? <FishIcon /> : <BugIcon />}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={critter.name}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography component="span" variant="body2" color="text.primary">
                                                                {critter.location} • {critter.time}
                                                            </Typography>
                                                            {' — '}{critter.rarity}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                </List>
                            )}

                            {alignment === 'grid' && (
                                <Grid container spacing={2}>
                                    {getAllCrittersData()
                                        .filter(critter => critter.value >= valueRange[0] && critter.value <= valueRange[1])
                                        .map((critter) => (
                                            <Grid size={{xs:12, sm:6, md:4}} key={critter.name}>
                                                <Card variant="outlined">
                                                    <CardContent>
                                                        <Typography variant="h6" component="div">
                                                            {critter.name}
                                                        </Typography>
                                                        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                                                            <Rating
                                                                name={`${critter.name}-rating`}
                                                                value={critter.rarity === 'Common' ? 1 : critter.rarity === 'Uncommon' ? 2 : 3}
                                                                max={3}
                                                                readOnly
                                                                size="small"
                                                            />
                                                            <Typography variant="caption" sx={{ ml: 1 }}>
                                                                {critter.rarity}
                                                            </Typography>
                                                        </Box>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                                            {critter.seasons.map(season => (
                                                                <Tooltip key={season} title={season} arrow>
                                                                    <Chip
                                                                        icon={getSeasonIcon(season)}
                                                                        size="small"
                                                                        variant="outlined"
                                                                        label=""
                                                                    />
                                                                </Tooltip>
                                                            ))}
                                                        </Stack>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Location: {critter.location}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Time: {critter.time}
                                                        </Typography>
                                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Typography variant="body2" fontWeight="bold">
                                                                {critter.value} Bells
                                                            </Typography>
                                                            <Button size="small" variant="outlined">
                                                                Details
                                                            </Button>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                </Grid>
                            )}

                            {alignment === 'table' && (
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Rarity</TableCell>
                                                <TableCell>Location</TableCell>
                                                <TableCell>Active Time</TableCell>
                                                <TableCell>Seasons</TableCell>
                                                <TableCell align="right">Value (Bells)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {getAllCrittersData()
                                                .filter(critter => critter.value >= valueRange[0] && critter.value <= valueRange[1])
                                                .map((critter) => (
                                                    <TableRow key={critter.name} hover>
                                                        <TableCell component="th" scope="row">
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                {selectedCritter === 'fish' ? <FishIcon /> : <BugIcon />}
                                                                <Typography sx={{ ml: 1 }}>{critter.name}</Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                label={critter.rarity}
                                                                color={
                                                                    critter.rarity === 'Common' ? 'info' :
                                                                        critter.rarity === 'Uncommon' ? 'warning' : 'secondary'
                                                                }
                                                                size="small"
                                                            />
                                                        </TableCell>
                                                        <TableCell>{critter.location}</TableCell>
                                                        <TableCell>{critter.time}</TableCell>
                                                        <TableCell>
                                                            <Stack direction="row" spacing={1}>
                                                                {critter.seasons.map(season => (
                                                                    <Tooltip key={season} title={season} arrow>
                                                                        <Box>{getSeasonIcon(season)}</Box>
                                                                    </Tooltip>
                                                                ))}
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                                            {critter.value}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                <Pagination count={5} color="primary" showFirstButton showLastButton />
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Box>

            {/* By Season Tab Content */}
            <Box role="tabpanel" hidden={tabValue !== 2}>
                {tabValue === 2 && (
                    <>
                        <Box sx={{ mb: 3 }}>
                            <ToggleButtonGroup
                                value={selectedSeason}
                                exclusive
                                onChange={handleSeasonChange}
                                aria-label="season selection"
                                color="primary"
                                sx={{ width: '100%' }}
                            >
                                <ToggleButton value="spring" aria-label="spring season" sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <SpringIcon />
                                        <Typography variant="body2" sx={{ mt: 1 }}>Spring</Typography>
                                    </Box>
                                </ToggleButton>
                                <ToggleButton value="summer" aria-label="summer season" sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <SummerIcon />
                                        <Typography variant="body2" sx={{ mt: 1 }}>Summer</Typography>
                                    </Box>
                                </ToggleButton>
                                <ToggleButton value="fall" aria-label="fall season" sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <FallIcon />
                                        <Typography variant="body2" sx={{ mt: 1 }}>Fall</Typography>
                                    </Box>
                                </ToggleButton>
                                <ToggleButton value="winter" aria-label="winter season" sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <WinterIcon />
                                        <Typography variant="body2" sx={{ mt: 1 }}>Winter</Typography>
                                    </Box>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        <Card>
                            <CardHeader
                                title={`${selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)} ${selectedCritter === 'fish' ? 'Fish' : 'Bugs'}`}
                                subheader={`${hemisphere === 'north' ? 'Northern' : 'Southern'} Hemisphere`}
                                avatar={
                                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                                        {getSeasonIcon(selectedSeason)}
                                    </Avatar>
                                }
                            />
                            <CardContent>
                                {getSeasonalCritters().length > 0 ? (
                                    <>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="body1" gutterBottom>
                                                Rarity Distribution
                                            </Typography>
                                            <Box sx={{ mt: 2 }}>
                                                <Typography variant="caption">Common</Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={getSeasonalCritters().filter(c => c.rarity === 'Common').length / getSeasonalCritters().length * 100}
                                                    color="info"
                                                    sx={{ height: 10, borderRadius: 5, mb: 1 }}
                                                />
                                                <Typography variant="caption">Uncommon</Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={getSeasonalCritters().filter(c => c.rarity === 'Uncommon').length / getSeasonalCritters().length * 100}
                                                    color="warning"
                                                    sx={{ height: 10, borderRadius: 5, mb: 1 }}
                                                />
                                                <Typography variant="caption">Rare</Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={getSeasonalCritters().filter(c => c.rarity === 'Rare').length / getSeasonalCritters().length * 100}
                                                    color="secondary"
                                                    sx={{ height: 10, borderRadius: 5 }}
                                                />
                                            </Box>
                                        </Box>

                                        <Divider sx={{ my: 3 }}>
                                            <Chip label={`${getSeasonalCritters().length} ${selectedCritter}`} />
                                        </Divider>

                                        {getSeasonalCritters().map((critter) => (
                                            <Accordion key={critter.name} variant="outlined" sx={{ mb: 1 }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls={`${critter.name}-content`}
                                                    id={`${critter.name}-header`}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                                        <Typography>{critter.name}</Typography>
                                                        <Box>
                                                            <Chip
                                                                label={critter.rarity}
                                                                size="small"
                                                                color={
                                                                    critter.rarity === 'Common' ? 'info' :
                                                                        critter.rarity === 'Uncommon' ? 'warning' : 'secondary'
                                                                }
                                                                sx={{ mr: 1 }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        <Grid size={{xs:12, md:6}}>
                                                            <Typography variant="subtitle2">Availability Details</Typography>
                                                            <Box sx={{ mt: 1 }}>
                                                                <Typography variant="body2">
                                                                    <strong>Location:</strong> {critter.location}
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    <strong>Active Hours:</strong> {critter.time}
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    <strong>Seasons:</strong> {critter.seasons.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                        <Grid size={{xs:12, md:6}}>
                                                            <Typography variant="subtitle2">Catching Tips</Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {selectedCritter === 'fish'
                                                                    ? `Look for a ${critter.rarity === 'Rare' ? 'large' : 'medium'} shadow in the ${critter.location.toLowerCase()}.`
                                                                    : `${critter.rarity === 'Rare' ? 'Move slowly' : 'Approach carefully'} when you spot this bug.`}
                                                            </Typography>
                                                            <Box sx={{ mt: 2 }}>
                                                                <Button size="small" variant="contained" color="primary">
                                                                    Set Reminder
                                                                </Button>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                        ))}
                                    </>
                                ) : (
                                    <Alert severity="warning" icon={false} sx={{ mt:2 ,display:"flex", justifyContent: 'center' }}>
                                        <AlertTitle>No critters found</AlertTitle>
                                        There are no {selectedCritter} available during this season in the {hemisphere === 'north' ? 'Northern' : 'Southern'} Hemisphere.
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </>
                )}
            </Box>

            {/* Loading Backdrop */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress color="inherit" />
                    <Typography sx={{ mt: 2 }}>Finding the best times...</Typography>
                </Box>
            </Backdrop>

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