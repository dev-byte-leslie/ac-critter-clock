import {FishApiResponse, Fish} from "../types/Fish.ts";

export const fishApi = {
    // Get all fish
    getAllFish: async (): Promise<FishApiResponse[]> => {
        const response = await fetch('/api/proxy?endpoint=all');
        if (!response.ok) {
            throw new Error('Failed to fetch fish data');
        }
        return response.json();
    },

    // Get a specific fish by name
    getFishByName: async (fishName: string): Promise<Fish> => {
        const response = await fetch(`/api/proxy?endpoint=single&fish=${encodeURIComponent(fishName)}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data for fish: ${fishName}`);
        }
        return response.json();
    }
};
