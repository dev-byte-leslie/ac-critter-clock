export interface Fish {
    url: string;
    name: string;
    number: number;
    image_url: string;
    render_url: string;
    location: string;
    shadow_size: FishShadowSize;
    rarity: string;
    total_catch: number;
    sell_nook: number
    sell_cj: number
    tank_width: number
    tank_length: number
    catchphrases: string[];
    north: HemisphereAvailability;
    south: HemisphereAvailability;
}

export interface FishApiResponse {
    url: string;
    name: string;
    number: number;
    image_url: string;
    render_url: string;
    location: string;
    shadow_size: string;
    rarity: string;
    total_catch: number;
    sell_nook: number;
    sell_cj: number;
    tank_width: number;
    tank_length: number;
    catchphrases: string[];
    north: HemisphereAvailability;
    south: HemisphereAvailability;
}


export enum FishShadowSize {
    XSmall = "X-Small",
    Small = "Small",
    Medium = "Medium",
    MediumWithFin = "Medium w/Fin",
    Large = "Large",
    LargeWithFin = "Large w/Fin",
    XLarge = "X-Large",
    XXLarge = "XX-Large",
    Long = "Long"
}


interface AvailabilityEntry {
    months: string;
    time: string;
}

interface TimesByMonth {
    [key: number]: string;
}

interface HemisphereAvailability {
    availabilityArray: AvailabilityEntry[];
    timesByMonth: TimesByMonth;
    months: string;
    monthsArray: number[];
}
