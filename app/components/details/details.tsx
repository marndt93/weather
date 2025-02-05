import "./details.css";
import type { IWeather } from "~/interfaces/weather";
import { getWindDirection } from "~/utils/helpers";
import { DetailItem } from "../detail-item/detail-item";

export function Details(props: {weather?: IWeather}) {
    const windDirection = getWindDirection(Number(props.weather?.current.windDirection));
    const windValue = `${props.weather?.current.windSpeed} ${props.weather?.currentUnits.wind_speed_10m} ${windDirection}`;
    const gust = `${props.weather?.current.windGusts} ${props.weather?.currentUnits.wind_speed_10m}`;
    const feelsLike = `${props.weather?.current.feelsLike}${props.weather?.currentUnits.apparent_temperature}`;
    const temperature = Number(props.weather?.current.temperature);
    const precipitationChance = `(${Number(props.weather?.current.precipitationProbability)}${props.weather?.currentUnits.precipitation_probability} chance)`;
    const precipitation = `${props.weather?.current.precipitation}${props.weather?.currentUnits.precipitation}`;
    const precipitationIcon = temperature > 0 ? 'rainy' : 'weather_snowy';
    const humidity = `${props.weather?.current.humidity}${props.weather?.currentUnits.relative_humidity_2m}`;
    const pressure = `${props.weather?.current.pressure} ${props.weather?.currentUnits.surface_pressure}`;

    return (
        <div className="weather-details">
            <div className="flex flex-row justify-around w-[100%]">
                <div className="flex flex-col">
                    <DetailItem icon="device_thermostat" before="Feels Like " value={feelsLike} />
                    <DetailItem icon={precipitationIcon} after={` ${precipitationChance}`} value={precipitation} />
                    <DetailItem icon="water_drop" after=" Humidity" value={humidity} />
                </div>
                <div className="flex flex-col">
                    <DetailItem icon="air" value={windValue} />
                    <DetailItem icon="airwave" after=" Gusts" value={gust} />
                    <DetailItem icon="readiness_score" value={pressure} />
                </div>
            </div>
        </div>
    );
}