import "./daily.css";
import { FormControl, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import type { IWeather, IWeatherDetails } from "~/interfaces/weather";
import { getDayOfWeek, getWindDirection } from "~/utils/helpers";
import { DetailItem } from "../detail-item/detail-item";
import { Hourly } from "../hourly/hourly";
import type { IHourly } from "~/interfaces/hourly";

export function Daily(props: {weather?: IWeather}) {
    /** Options for the selectable day. */
    const [days, setDays] = useState<string[]>([]);
    /** Selected day to display the dail weather for. */
    const [day, setDay] = useState<string>('Today');
    /** Handle a day change. */
    const dayChange = (event: SelectChangeEvent) => {
        setDay(event.target.value);
    }

    /** the weather details for the currently selected day. */
    const [details, setDetails] = useState<IWeatherDetails>({});

    /** the hourly weather details for the currently selected day. */
    const [hourly, setHourly] = useState<IHourly[]>([]);

    /** generate new weather details for the currently selected day. */
    const generateData = () => {
        const i = days.length ? days.findIndex((x) => x === day) : 0;
        const newData: IWeatherDetails = {
            temperature: Number((Number(props.weather?.daily.temperatureMax?.[i]) + Number(props.weather?.daily.temperatureMin?.[i]) /2).toFixed(1)),
            temperatureMax: props.weather?.daily.temperatureMax?.[i] || 0,
            temperatureMin: props.weather?.daily.temperatureMin?.[i] || 0,
            precipitation: props.weather?.daily.precipitation?.[i] || 0,
            precipitationProbability: props.weather?.daily.precipitationProbability?.[i] || 0,
            weatherCode: props.weather?.daily.weatherCode?.[i] || 0,
            windSpeed: props.weather?.daily.windSpeed?.[i] || 0,
            windDirection: props.weather?.daily.windDirection?.[i] || 0,
            windGusts: props.weather?.daily.windGusts?.[i] || 0,
        }
        const hourlyDate = new Date(new Date().getTime() + (86400000 * i));
        const hourlyData: IHourly[] = [];
        const units = props.weather?.hourlyUnits;
        props.weather?.hourly.time?.forEach((x: Date, index: number) => {
            if ( x.getDate() === hourlyDate.getDate()) {
                const data: IHourly = {
                    date: x,
                    temperature: `${props.weather?.hourly.temperature?.[index]} ${units.temperature_2m}`,
                    precipitation: `${props.weather?.hourly.precipitation?.[index]} ${units.precipitation}`,
                    precipitationChance: `${props.weather?.hourly.precipitationProbability?.[index]} ${units.precipitation_probability}`,
                    weatherCode: Number(props.weather?.hourly.weatherCode?.[index]),
                    wind: `${props.weather?.hourly.windSpeed?.[index]} ${units.wind_speed_10m}`,
                    windDirection: getWindDirection(Number(props.weather?.hourly.windDirection?.[index])),
                    gusts: `${props.weather?.hourly.windGusts?.[index]} ${units.wind_gusts_10m}`,
                }
                hourlyData.push(data);
            }
        });
        setHourly(hourlyData);
        setDetails(newData);
    }

    useEffect(() => {
        console.log(props.weather);
        if (!days.length) {
            const dayOptions = ['Today', 'Tomorrow'];
            let date = new Date(new Date().getTime() + 86400000 + 86400000);
            for (let index = 0; index < 5; index++) {
                dayOptions.push(getDayOfWeek(date.getDay()));
                date = new Date(date.getTime() + 86400000);
            }
            setDays(dayOptions);
        }
        generateData();
    }, [day]);

    return (
        <div className="daily">
            <div className="flex flex-row justify-around w-[100%]">
                <FormControl variant="standard" sx={{ m: 1, minWidht: 120}} size="small">
                    <Select
                        id="select"
                        value={day}
                        onChange={dayChange}>
                        {days.map((x: string) => <MenuItem key={x} value={x}>{x}</MenuItem>)}
                    </Select>
                </FormControl>
                <div className="w-[150px]"></div>
            </div>
            <div className="daily-details">
                <div className="flex flex-row justify-around w-[100%]">
                    <div className="flex flex-col">
                        <DetailItem icon="device_thermostat" value={`${details.temperature} ${props.weather?.currentUnits.temperature_2m}`} />
                        <DetailItem icon={Number(details.temperature) > 0 ? 'rainy' : 'weather_snowy'} after={` (${details.precipitationProbability}${props.weather?.currentUnits.precipitation_probability} chance)`} value={`${details.precipitation}${props.weather?.currentUnits.precipitation}`} />
                    </div>
                    <div className="flex flex-col">
                        <DetailItem icon="air" value={`${details.windSpeed} ${props.weather?.currentUnits.wind_speed_10m} ${getWindDirection(Number(details.windDirection))}`} />
                        <DetailItem icon="airwave" value={`${details.windGusts} ${props.weather?.currentUnits.wind_speed_10m}`} after=" Gusts" />
                    </div>
                </div>
            </div>
            <Hourly weather={props.weather} hourly={hourly} />
        </div>
    );
}