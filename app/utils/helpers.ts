import { UserSettings, type ISettings } from "~/interfaces/settings";

/** Get the wind cardinal direction from degrees. Eg: 0 => 'N', 100 => 'S' */
export const getWindDirection = (dir: number): string => {
    let direction = 'N';
    if (dir >= 349 || dir < 11) {
        direction = 'N';
    } else if (dir >= 11 && dir < 33) {
        direction = 'NNE';
    } else if (dir >= 33 && dir < 56) {
        direction = 'NE';
    } else if (dir >= 56 && dir < 78) {
        direction = 'ENE';
    } else if (dir >= 78 && dir < 101) {
        direction = 'E';
    } else if (dir >= 101 && dir < 123) {
        direction = 'ESE';
    } else if (dir >= 123 && dir < 146) {
        direction = 'SE';
    } else if (dir >= 146 && dir < 168) {
        direction = 'SSE';
    } else if (dir >= 168 && dir < 191) {
        direction = 'S';
    } else if (dir >= 191 && dir < 213) {
        direction = 'SSW';
    } else if (dir >= 213 && dir < 236) {
        direction = 'SW';
    } else if (dir >= 236 && dir < 258) {
        direction = 'WSW';
    } else if (dir >= 258 && dir < 281) {
        direction = 'W';
    } else if (dir >= 281 && dir < 303) {
        direction = 'WNW';
    } else if (dir >= 303 && dir < 326) {
        direction = 'NW';
    } else if (dir >= 326 && dir < 348) {
        direction = 'NNW';
    }
    return direction;
}

/** check if settings are valid. */
export const validSettings = (s: ISettings): boolean => {
    let isValid = true;
    const settings = new UserSettings(s);
    Object.keys(settings).forEach((key: string) => {
        const val = settings[key as keyof ISettings];
        if (val === undefined || val === null || val === '') {
            isValid = false;
        }
    });
    return isValid;
}

/** Get the day of the week from Date.getDay() output. */
export const getDayOfWeek = (x: number): string => {
    switch (x) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return '';
    }
}

/** Get icon for a given weather code number. */
export const getIcon = (weatherCode: number): string => {
    let icon = '';
    switch(weatherCode) {
        case 0:
        case 1: {
            icon = 'sunny';
            break;
        }
        case 2: {
            icon = 'partly_cloudy_day'
            break;
        }
        case 3: {
            icon = 'cloud';
            break;
        }
        case 45:
        case 48: {
            icon = 'foggy';
            break;
        }
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82: {
            icon = 'rainy';
            break;
        }
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86: {
            icon = 'weather_snowy';
            break;
        }
        case 95:
        case 96:
        case 99: {
            icon = 'thunderstorm';
            break;
        }
    }
    return icon;
}

export const WeatherCodeMap = new Map<number, string> ([
    [-1, ''],
    [0, 'Clear Sky'],
    [1, 'Mainly Clear'],
    [2, 'Partly Cloudy'],
    [3, 'Overcast'],
    [45, 'Foggy'],
    [48, 'Depositing rime fog'],
    [51, 'Light Drizzle'],
    [53, 'Drizzle'],
    [55, 'Drizzle'],
    [56, 'Freezing, light drizzle'],
    [57, 'Freezing drizzle'],
    [61, 'Light rain'],
    [63, 'Rain'],
    [65, 'Heavy rain'],
    [66, 'Freezing, light rain'],
    [67, 'Freezing rain'],
    [71, 'Light snow'],
    [73, 'Snow'],
    [75, 'Heavy snow'],
    [77, 'Snow grains'],
    [80, 'Light showers'],
    [81, 'Showers'],
    [82, 'Heavy showers'],
    [85, 'Light snow showers'],
    [86, 'Snow showers'],
    [95, 'Thunderstorm'],
    [96, 'Thunderstorm with hail'],
    [99, 'Thunderstorm with hail'],

])