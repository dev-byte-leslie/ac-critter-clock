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
    HEMISPHERE_SOUTH
} from "./constants";

export function filterFish(
    allFish: Fish[],
    selectedFish: Fish,
    isRaining: boolean,
    selectedHemisphere: string,
    selectedMonth: number,
): Fish[] {
    const results = filterFishLocation(allFish, selectedFish, isRaining);
    const result2 = filterFishDate(results, selectedFish, selectedHemisphere, selectedMonth)
    console.log(result2)
    return result2;
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
function filterFishDate(
    filteredFish: Fish[],
    selectedFish: Fish,
    selectedHemisphere: string,
    selectedMonth: number,
): Fish[] {
const monthActual:number = selectedMonth +1;
    const selectedFishAvailability : HemisphereAvailability =
        selectedHemisphere == HEMISPHERE_NORTH ? selectedFish.north : selectedFish.south
    console.log ("hemisphere: " + selectedHemisphere);
    console.log ("selected month: " + monthActual.toString());
    console.log(selectedFishAvailability)

    if(!selectedFishAvailability.monthsArray.includes(monthActual)){
        console.log("creature month mismatch");
        //todo handle case where selected selected fish does not have availability in the selected month
    }
    // console.log ("selected fish: " + selectedFish.name);
    // console.log ("hemisphere: " + selectedHemisphere);
    return filteredFish.filter(fish => {
        const fishAvailability : HemisphereAvailability =
            selectedHemisphere == HEMISPHERE_NORTH ? fish.north : fish.south;

        // console.log("checking " + fish.name)
        if (!fishAvailability.monthsArray.includes(selectedMonth)) {
            // console.log(fish.name + " not included in month");
            return false;
        }
        // console.log(fish.name + " IS included in month");
        return true;
    });
}





export { filterFishLocation };


