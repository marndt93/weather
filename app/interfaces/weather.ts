export interface IWeather {
    current: IWeatherDetails;
    currentUnits: any;
    hourly: IWeatherDetailsHourly;
    hourlyUnits: any;
    daily: IWeatherDetailsDaily;
    dailyUnits: any;
}

export interface IWeatherDetails {
    temperature?: number;
    feelsLike?: number;
    humidity?: number;
    precipitation?: number;
    precipitationProbability?: number;
    pressure?: number;
    temperatureMax?: number;
    temperatureMin?: number;
    weatherCode?: number;
    windSpeed?: number;
    windDirection?: number;
    windGusts?: number;
}

export interface IWeatherDetailsHourly {
    time?: Date[];
    temperature?: number[];
    feelsLike?: number[];
    humidity?: number[];
    precipitation?: number[];
    precipitationProbability?: number[];
    pressure?: number[];
    temperatureMax?: number[];
    temperatureMin?: number[];
    weatherCode?: number[];
    windSpeed?: number[];
    windDirection?: number[];
    windGusts?: number[];
}

export interface IWeatherDetailsDaily {
    daylightDuration?: Date[];
    precipitation?: number[];
    precipitationProbability?: number[];
    sunrise?: Date[];
    sunset?: Date[];
    temperatureMax?: number[];
    temperatureMin?: number[];
    day?: Date[];
    weatherCode?: number[];
    windSpeed?: number[];
    windDirection?: number[];
    windGusts?: number[];

}