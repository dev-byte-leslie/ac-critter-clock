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

export function filterFish(
    allFish: Fish[],
    selectedFish: Fish,
    isRaining: boolean,
    selectedHemisphere: string,
    selectedMonth: number,
): Fish[] {
    const locationFiltered = filterFishLocation(allFish, selectedFish, isRaining);
    const monthFiltered = filterFishMonth(locationFiltered, selectedFish, selectedHemisphere, selectedMonth)
    const timeFiltered = findOptimalTime(monthFiltered, selectedFish)
    console.log(timeFiltered)
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
 * TODO comment
 */
function filterFishMonth (
    filteredFish: Fish[],
    selectedFish: Fish,
    selectedHemisphere: string,
    selectedMonth: number,
): Fish[] {

    const selectedFishAvailability : HemisphereAvailability =
        selectedHemisphere == HEMISPHERE_NORTH ? selectedFish.north : selectedFish.south

    if(!selectedFishAvailability.monthsArray.includes(selectedMonth)){
        console.error(`${selectedFish.name} is not available during month ${selectedMonth}.`);
        return filteredFish;
        //TODO: handle user friendly error by limiting the fish drop down to only fish available during said month?
        //then possibly remove selectedFish param.
    }


    return filteredFish.filter(fish => {
        const fishAvailability : HemisphereAvailability =
            selectedHemisphere == HEMISPHERE_NORTH ? fish.north : fish.south;

        if (!fishAvailability.monthsArray.includes(selectedMonth)) {
            return false;
        }
        return true;
    });
}

/**
 * TODO comment
 */
function findOptimalTime (
    filteredFish: Fish[],
    selectedFish: Fish,
    selectedHemisphere: string,
    selectedMonth: number,
): Fish[] {

    return filteredFish.filter(fish => {

        if (!fishAvailability.monthsArray.includes(selectedMonth)) {
            return false;
        }
        return true;
    });
}
