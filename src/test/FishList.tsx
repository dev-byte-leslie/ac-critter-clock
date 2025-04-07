import { fishApi } from '../services/api';
import type { Fish, FishApiResponse, FishShadowSize } from '../types/Fish';

export const loadFishList = async (): Promise<Fish[]> => {
    try {
        const data: FishApiResponse[] = await fishApi.getAllFish();

        // Convert API response to Fish type
        return data.map((fish) => ({
            name: fish.name,
            url: fish.url,
            number: fish.number,
            image_url: fish.image_url,
            render_url: fish.render_url,
            location: fish.location,
            shadow_size: fish.shadow_size as FishShadowSize,
            rarity: fish.rarity,
            total_catch: fish.total_catch,
            sell_nook: fish.sell_nook,
            sell_cj: fish.sell_cj,
            tank_width: fish.tank_width,
            tank_length: fish.tank_length,
            catchphrases: fish.catchphrases,
            north: fish.north,
            south: fish.south,
        }));
    } catch (err) {
        console.error("Error loading fish data:", err);
        return [];
    }
};
