export class UserSettings {
    public locations: ILocation[];
    public selectedLocation: string;
    public temperatureUnit: TemperatureUnit;
    public speedUnit: SpeedUnit;
    public precipitationUnit: PrecipitationUnit;
    constructor(settings: ISettings) {
        this.locations = settings.locations || [];
        this.selectedLocation = settings.selectedLocation || '';
        this.temperatureUnit = settings.temperatureUnit;
        this.speedUnit = settings.speedUnit;
        this.precipitationUnit = settings.precipitationUnit;
    }
}

export interface ISettings {
     locations: ILocation[];
     selectedLocation: string;
     temperatureUnit: TemperatureUnit;
     speedUnit: SpeedUnit;
     precipitationUnit: PrecipitationUnit;
}

export interface ILocation {
     city: string;
     latitude: number;
     longitude: number;
}

export enum TemperatureUnit {
    Fahrenheit = 'fahrenheit',
    Celsius = 'celsius'
}

export enum SpeedUnit {
    Kmh = 'kmh',
    Mph = 'mph'
}

export enum PrecipitationUnit {
    Inch = 'inch',
    Mm = 'mm'
}