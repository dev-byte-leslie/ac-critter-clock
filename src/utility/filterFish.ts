import {Fish, HemisphereAvailability} from "../types/Fish";
import {
    SEA_LOCATION,
    SEA_RAINING_LOCATION,
    PIER_LOCATION,
    RIVER_LOCATION,
    RIVER_MOUTH_LOCATION,
    RIVER_CLIFFTOP_LOCATION,
    POND_LOCATION,
    HEMISPHERE_NORTH,
} from "./constants";
import {
    OptimalCatchResult,
    TimeRange,
    parseTimeString,
    getHoursInRanges,
    countCompetitionAtHour,
    groupConsecutiveHours
} from "./parseTimes.ts";

export function filterFish(
    allFish: Fish[],
    selectedFish: Fish,
    isRaining: boolean,
    selectedHemisphere: string,
    selectedMonth: number,
): Fish[] { //todo pull selected fish, hemisphere and month into an object?
    const locationFiltered = filterFishLocation(allFish, selectedFish, isRaining);
    const monthFiltered = filterFishMonth(locationFiltered, selectedFish, selectedHemisphere, selectedMonth)
    const optimalTime = findOptimalCatchTime(monthFiltered, selectedFish, selectedHemisphere, selectedMonth)
    console.log(optimalTime);
    return monthFiltered;
}

/**
 * Filters fish based on location relationships and weather conditions.
 * Returns Fish[] that compete with the selected Fish in the same location.
 */
function filterFishLocation(
    allFish: Fish[],
    selectedFish: Fish,
    isRaining: boolean
): Fish[] {

    // Define competing fish locations. Locations are not 1:1 because
    // of sub-locations and weather conditions.
    const locationRelationships: Record<string, string[]> = {
        "Sea": [SEA_LOCATION, SEA_RAINING_LOCATION, PIER_LOCATION],
        "Sea (raining)": [SEA_LOCATION, SEA_RAINING_LOCATION, PIER_LOCATION],
        "Pier": [SEA_LOCATION, SEA_RAINING_LOCATION, PIER_LOCATION],
        "River": [RIVER_LOCATION, RIVER_MOUTH_LOCATION, RIVER_CLIFFTOP_LOCATION],
        "River (mouth)": [RIVER_LOCATION, RIVER_MOUTH_LOCATION],
        "River (clifftop)": [RIVER_LOCATION, RIVER_CLIFFTOP_LOCATION],
        "Pond": [POND_LOCATION],
    };

    const targetLocation = selectedFish.location;
    const competingLocations = locationRelationships[targetLocation] || [targetLocation];

    return allFish.filter(fish => {
        if (fish.number === selectedFish.number) {
            return false;
        }

        if (!competingLocations.includes(fish.location)) {
            return false;
        }

        if (fish.location === SEA_RAINING_LOCATION && !isRaining) {
            return false;
        }

        return true;
    });
}

/**
 * Filter all Fish by user-selected month
 */
function filterFishMonth(
    filteredFish: Fish[],
    selectedFish: Fish,
    selectedHemisphere: string,
    selectedMonth: number,
): Fish[] {

    const selectedFishAvailability: HemisphereAvailability =
        selectedHemisphere == HEMISPHERE_NORTH ? selectedFish.north : selectedFish.south

    if (!selectedFishAvailability.monthsArray.includes(selectedMonth)) {
        console.error(`${selectedFish.name} is not available during month ${selectedMonth}.`);
        return filteredFish;
        //TODO: handle user friendly error by limiting the fish drop down to only fish available during said month?
        //then possibly remove selectedFish param.
    }


    return filteredFish.filter(fish => {
        const fishAvailability: HemisphereAvailability =
            selectedHemisphere == HEMISPHERE_NORTH ? fish.north : fish.south;

        if (!fishAvailability.monthsArray.includes(selectedMonth)) {
            return false;
        }
        return true;
    });
}

/**
 * Finds the optimal time to catch a fish with minimum competition
 */
function findOptimalCatchTime(
    filteredFish: Fish[],
    selectedFish: Fish,
    selectedHemisphere: string,
    selectedMonth: number
): OptimalCatchResult {
    const selectedFishAvailability: HemisphereAvailability =
        selectedHemisphere == HEMISPHERE_NORTH ? selectedFish.north : selectedFish.south
    const selectedTimeString = selectedFishAvailability.timesByMonth[selectedMonth];

    // Parse target fish available time ranges
    const targetTimeRanges = parseTimeString(selectedTimeString);

    if (targetTimeRanges.length === 0) {
        throw new Error(`Could not parse time string for target fish: ${selectedTimeString}`);
    }

    // Get all competitor fish time ranges
    const competitorTimeRanges: TimeRange[][] = [];

    for (const fish of filteredFish) {
        // Skip if it's the same fish
        if (fish.number === selectedFish.number) {
            continue;
        }

        const fishAvailability : HemisphereAvailability = //todo pull this out into separate function, used several times
            selectedHemisphere == HEMISPHERE_NORTH ? fish.north : fish.south
        const fishTimeString = fishAvailability.timesByMonth[selectedMonth];

        // Skip if competitor fish not available this month
        if (fishTimeString === "NA") {
            continue;
        }

        // Parse competitor time ranges and add to array
        const fishTimeRanges = parseTimeString(fishTimeString);
        if (fishTimeRanges.length > 0) {
            competitorTimeRanges.push(fishTimeRanges);
        }
    }

    // Get all hours when target fish is available
    const targetAvailableHours = getHoursInRanges(targetTimeRanges);

    // Analyze competition for each hour in target fish's availability
    let minCompetition = Infinity;
    const optimalHours: number[] = [];

    for (const hour of targetAvailableHours) {
        const competitionCount = countCompetitionAtHour(hour, competitorTimeRanges);

        if (competitionCount < minCompetition) {
            minCompetition = competitionCount;
            optimalHours.length = 0; // Clear array
            optimalHours.push(hour);
        } else if (competitionCount === minCompetition) {
            optimalHours.push(hour);
        }
    }

    // Group consecutive optimal hours into time ranges
    const optimalRanges = groupConsecutiveHours(optimalHours);

    return {
        minCompetition: minCompetition === Infinity ? 0 : minCompetition,
        optimalHours,
        optimalRanges,
        totalCompetitors: competitorTimeRanges.length,
        targetAvailableRanges: targetTimeRanges
    };
}
