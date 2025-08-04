import {ALL_DAY_AVAILABLE, NOT_AVAILABLE} from "./constants.ts";

export interface TimeRange {
    start: number;
    end: number;
}

export interface OptimalCatchResult {
    minCompetition: number;
    optimalHours: number[];
    optimalRanges: TimeRange[];
    totalCompetitors: number;
    targetAvailableRanges: TimeRange[];
}

/**
 * Parse individual times like "9 AM" or "11 PM" to 24-hour format
 */
function parseTimeTo24(timeStr: string): number {
    const cleanTime = timeStr.trim().toUpperCase();

    if (!cleanTime.includes("AM") && !cleanTime.includes("PM")) {
        return -1;
    }

    const isAM = cleanTime.includes("AM");
    const hourStr = cleanTime.replace(/AM|PM/g, "").trim();
    const hour = parseInt(hourStr);

    if (isNaN(hour) || hour < 1 || hour > 12) {
        return -1;
    }

    if (isAM) {
        return hour === 12 ? 0 : hour; // 12 AM = 0, others stay the same
    } else {
        return hour === 12 ? 12 : hour + 12; // 12 PM = 12, others add 12 hours
    }
}

/**
 * Parse individual 24-hour times like "9" or "22" to 12-hour format
 */
export function parseTimeTo12(hour :number) {
    if (hour === 0) return "12 AM"; //midnight edge case
    if (hour === 12) return "12 PM"; //noon edge case
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
}

/**
 * Counts how many competitor fish are available at a specific hour //todo make generic critter
 */
export function countCompetitionAtHour(hour: number, competitorTimeRanges: TimeRange[][]): number {
    let competitionCount = 0;

    for (const fishTimeRanges of competitorTimeRanges) {

        let fishAvailable = false; //todo make generic critter
        for (const timeRange of fishTimeRanges) {
            if (isHourInRange(hour, timeRange)) {
                fishAvailable = true;
                break;
            }
        }
        if (fishAvailable) {
            competitionCount++;
        }
    }

    return competitionCount;
}

/**
 * Parse time strings like "9 AM – 4 PM & 9 PM – 4 AM" to time ranges. End hour is exclusive.
 */
export function parseTimeString(timeStr: string): TimeRange[] {
    if (timeStr === NOT_AVAILABLE || !timeStr || timeStr.trim() === "") {
        return [];
    }

    if (timeStr === ALL_DAY_AVAILABLE) {
        return [{start: 0, end: 24}];
    }

    // Split multiple time ranges separated by "&"
    const timeRanges = timeStr.split("&").map(range => range.trim());
    const parsedRanges: TimeRange[] = [];

    for (const range of timeRanges) {
        //handle all dash types, data returned from API uses an en dash
        const timeParts = range.split(/[-–—]/);

        if (timeParts.length !== 2) {
            continue; //todo handle error
        }

        const startTimeStr = timeParts[0].trim();
        const endTimeStr = timeParts[1].trim();

        const startHour = parseTimeTo24(startTimeStr);
        const endHour = parseTimeTo24(endTimeStr);

        if (startHour === -1 || endHour === -1) {
            continue; //todo shouldn't happen unless API data bad, handle error
        }


        if (startHour <= endHour) {
            parsedRanges.push({
                start: startHour,
                end: endHour === 0 ? 24 : endHour
            });
        } else {
            parsedRanges.push({
                start: startHour,
                end: endHour
            });
        }
    }

    return parsedRanges;
}

/**
 * Checks if a specific hour is within a time range. End hour is exclusive.
 */
export function isHourInRange(hour: number, range: TimeRange): boolean {
    if (range.start <= range.end) {
        return hour >= range.start && hour < range.end;
    } else { // Overnight range (e.g., 9 PM to 4 AM)
        return hour >= range.start || hour < range.end;
    }
}

/**
 * Gets all hours that fall within the given time ranges. End hour is exclusive.
 */
export function getHoursInRanges(timeRanges: TimeRange[]): number[] {
    const hours: Set<number> = new Set();

    for (const range of timeRanges) {
        if (range.start <= range.end) {
            for (let hour = range.start; hour < range.end; hour++) {
                hours.add(hour);
            }
        } else {
            // Overnight range
            for (let hour = range.start; hour <= 23; hour++) {
                hours.add(hour);
            }
            for (let hour = 0; hour < range.end; hour++) {
                hours.add(hour);
            }
        }
    }

    return Array.from(hours).sort((a, b) => a - b);
}

/**
 * Groups consecutive hours into readable time ranges
 */
export function groupConsecutiveHours(hours: number[]): TimeRange[] {
    if (hours.length === 0) {
        return [];
    }

    const sortedHours = [...hours].sort((a, b) => a - b);
    const ranges: TimeRange[] = [];
    let currentStart = sortedHours[0];
    let currentEnd = sortedHours[0];

    for (let i = 1; i < sortedHours.length; i++) {
        if (sortedHours[i] === currentEnd + 1) {
            currentEnd = sortedHours[i];
        } else {
            ranges.push({start: currentStart, end: currentEnd + 1});  // Add 1 to end to make time exclusive
            currentStart = sortedHours[i];
            currentEnd = sortedHours[i];
        }
    }

    ranges.push({start: currentStart, end: currentEnd + 1}); //Add 1 to end to make time exclusive
    return ranges;
}
