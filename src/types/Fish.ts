export interface Fish {
    name: string;
    url: string;
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
    name: string;
    url: string;
    number: string;
    image_url: string;
    render_url: string;
    catchphrase: string;
    catchphrase2: string
    catchphrase3: string
    location: string;
    shadow_size: string;
    rarity: string;
    total_catch: string;
    sell_nook: string;
    sell_cj: string;
    tank_width: string;
    tank_length: string;
    time: string; //"4PM - 9PM"
    n_availability: string; //"Jun - Sep"
    s_availability: string; //"Dec - Mar"
    catchphrases: string[];
    availability_north: AvailabilityEntry[]
    availability_south: AvailabilityEntry[]
    times_by_month_north: TimesByMonth
    times_by_month_south: TimesByMonth
    n_availability_array: string[]
    s_availability_array: string[]
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
    Long = "Long",
}


export interface AvailabilityEntry {
    months: string;
    time: string;
}

export interface TimesByMonth {
    [key: number]: string;
}

export interface HemisphereAvailability {
    availabilityArray: AvailabilityEntry[];
    timesByMonth: TimesByMonth;
    months: string;
    monthsArray: number[];
}
