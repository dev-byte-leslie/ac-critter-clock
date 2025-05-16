import { fishApi } from './api.ts';
import { Fish,
    FishApiResponse,
    FishShadowSize,
    AvailabilityEntry,
    TimesByMonth,
    HemisphereAvailability }
    from '../types/Fish';

/**
 * Maps Nookipedia API response to Fish
 */
export const loadFishList = async (): Promise<Fish[]> => {
    try {
        const data: FishApiResponse[] = await fishApi.getAllFish();

        return data.map((fish) => ({
            name: fish.name,
            url: fish.url,
            number: parseInt(fish.number),
            image_url: fish.image_url,
            render_url: fish.render_url,
            location: fish.location,
            shadow_size: mapShadowSize(fish.shadow_size),
            rarity: fish.rarity,
            total_catch: parseInt(fish.total_catch),
            sell_nook: parseInt(fish.sell_nook),
            sell_cj: parseInt(fish.sell_cj),
            tank_width: parseInt(fish.tank_width),
            tank_length: parseInt(fish.tank_length),
            catchphrases: fish.catchphrases,
            north: mapHemisphereAvailability(
                fish.availability_north,
                fish.times_by_month_north,
                fish.n_availability,
                fish.n_availability_array.map(Number)),
            south: mapHemisphereAvailability(
                fish.availability_south,
                fish.times_by_month_south,
                fish.s_availability,
                fish.s_availability_array.map(Number))
        }));
    } catch (err) {
        console.error("Error loading fish data:", err);
        return [];
    }

    /**
     * Maps shadow size string to FishShadowSize enum
     */
    function mapShadowSize(size: string): FishShadowSize {
        switch (size) {
            case "X-Small":
                return FishShadowSize.XSmall;
            case "Small":
                return FishShadowSize.Small;
            case "Medium":
                return FishShadowSize.Medium;
            case "Medium w/Fin":
                return FishShadowSize.MediumWithFin;
            case "Large":
                return FishShadowSize.Large;
            case "Large w/Fin":
                return FishShadowSize.LargeWithFin;
            case "X-Large":
                return FishShadowSize.XLarge;
            case "XX-Large":
                return FishShadowSize.XXLarge;
            case "Long":
                return FishShadowSize.Long;
            default:
                return FishShadowSize.Medium;
        }
    }

    /**
     * Maps hemisphere availability data into a single HemisphereAvailability object
     */
    function mapHemisphereAvailability(
        availabilityArray: AvailabilityEntry[],
        timesByMonth: TimesByMonth,
        months: string,
        monthsArray: number[]
    ): HemisphereAvailability {
        return {
            availabilityArray,
            timesByMonth,
            months,
            monthsArray
        };
    }
};
