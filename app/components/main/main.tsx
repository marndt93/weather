import "./main.css";
import { Alert, Icon, LinearProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { UserSettings } from "~/interfaces/settings";
import type { IWeather } from "~/interfaces/weather";
import { SETTINGS_STORAGE_KEY, WEATHER_DATA_CACHE_KEY } from "~/utils/constants";
import { validSettings } from "~/utils/helpers";
import { Weather } from "../weather/weather";
import { Layout } from "../layout/layout";

export function Main() {
    /** The navigator for switching routes */
    const navigate = useNavigate();

    /** API url string used for fetching data. */
    const API_STRING = 'https://api.open-meteo.com/v1/forecast';

    /** Whether this is the first render. */
    const firstRender = useRef(true);

    /** The flag for fetching data. */
    const [fetching, setFetching] = useState<boolean>(false);

    /** Error message. */
    const [error, setError] = useState<string>();

    /** The weather and user settings data. */
    const [data, setData] = useState<{weatherData: IWeather, userSettings: UserSettings}>({} as any);

    /** param variables used to determine which weather data to fetch. */
    const weatherVariables = ['temperature_2m','apparent_temperature','precipitation','precipitation_probability','weather_code','wind_speed_10m','wind_direction_10m','wind_gusts_10m','relative_humidity_2m','surface_pressure'];
    const dailyWeatherVariables = ['weather_code','temperature_2m_max','temperature_2m_min','sunrise','sunset','daylight_duration','precipitation_sum','precipitation_probability_max','wind_speed_10m_max','wind_gusts_10m_max','wind_direction_10m_dominant'];

    /** The refresh callback. */
    const refresh = () => {
        localStorage.removeItem(WEATHER_DATA_CACHE_KEY);
        firstRender.current = true;
        setData({} as any);
    }

    /** Check whether the weather data cache is valid. It expires after an hour. */
    const isValidCache = (): boolean => {
        let valid = true;
        const cache = JSON.parse(localStorage.getItem(WEATHER_DATA_CACHE_KEY) || '{}')?.data;
        const cachedTime = new Date(cache?.current?.time).getTime();
        const currentTime = new Date().getTime();
        // if the cache is over an hour old, invalidate it.
        if (currentTime - cachedTime > 3600000 || ! cache) {
            valid = false;
        }
        return valid;
    }

    const updateData = (result: any, userSettings: UserSettings): void => {
        setData({
            weatherData: {
                current: {
                    temperature: result.data.current.temperature_2m,
                    feelsLike: result.data.current.apparent_temperature,
                    humidity: result.data.current.relative_humidity_2m,
                    precipitation: result.data.current.precipitation,
                    precipitationProbability: result.data.current.precipitation_probability,
                    pressure: result.data.current.surface_pressure,
                    weatherCode: result.data.current.weather_code,
                    windSpeed: result.data.current.wind_speed_10m,
                    windDirection: result.data.current.wind_direction_10m,
                    windGusts: result.data.current.wind_gusts_10m,
                },
                currentUnits: result.data.current_units,
                hourly: {
                    time: result.data.hourly.time.map((x: string) => new Date(new Date(x).getTime() + new Date().getTimezoneOffset() * 60000)),
                    temperature: result.data.hourly.temperature_2m,
                    feelsLike: result.data.hourly.apparent_temperature,
                    humidity: result.data.hourly.relative_humidity_2m,
                    precipitation: result.data.hourly.precipitation,
                    precipitationProbability: result.data.hourly.precipitation_probability,
                    pressure: result.data.hourly.surface_pressure,
                    weatherCode: result.data.hourly.weather_code,
                    windSpeed: result.data.hourly.wind_speed_10m,
                    windDirection: result.data.hourly.wind_direction_10m,
                    windGusts: result.data.hourly.wind_gusts_10m,
                },
                hourlyUnits: result.data.hourly_units,
                daily: {
                    daylightDuration: result.data.daily.daylight_duration,
                    precipitation: result.data.daily.precipitation,
                    precipitationProbability: result.data.daily.precipitation_probability,
                    sunrise: result.data.daily.sunrise.map((x: string) => new Date(x)),
                    sunset: result.data.daily.sunset.map((x: string) => new Date(x)),
                    temperatureMin: result.data.daily.temperature_2m_min,
                    temperatureMax: result.data.daily.temperature_2m_max,
                    day: result.data.daily.time.map((x: string) => new Date(new Date(x).getTime() + new Date().getTimezoneOffset() * 60000)),
                    weatherCode: result.data.daily.weather_code,
                    windSpeed: result.data.daily.wind_speed_10m,
                    windDirection: result.data.daily.wind_direction_10m,
                    windGusts: result.data.daily.wind_gusts_10m,
                },
                dailyUnits: result.data.daily_units
            },
            userSettings
        })
    }

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            const settings = new UserSettings(JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || '{}'));
            if (!validSettings(settings)) {
                navigate("/settings");
            }

            if (isValidCache()) {
                console.log('loading weather data from cache...');
                updateData(JSON.parse(localStorage.getItem(WEATHER_DATA_CACHE_KEY) || ''), settings);
            } else {
                console.log('loading weather data from api...');
                setFetching(true);
                axios({
                    method: "Get",
                    url: `${API_STRING}`,
                    params: {
                        //settings params
                        timezone: 'auto',
                        latitude: settings.locations.find((x) => x.city === settings.selectedLocation)?.latitude,
                        longitude: settings.locations.find((x) => x.city === settings.selectedLocation)?.longitude,
                        temperature_unit: settings.temperatureUnit,
                        wind_speed_unit: settings.speedUnit,
                        precipitation_unit: settings.precipitationUnit,
                        format: 'json',
                        timeformat: 'iso8601',
                        //return param variables
                        current: weatherVariables,
                        hourly: weatherVariables,
                        daily: dailyWeatherVariables
                    }
                }).then((result) => {
                    updateData(result, settings);
                    localStorage.setItem(WEATHER_DATA_CACHE_KEY, JSON.stringify(result));
                    setFetching(false);
                }).catch((error) => {
                    console.log(error);
                    setError(error.response.data.reason);
                    setFetching(false);
                });
            }
        }
    });

    return (
        <Layout userSettings={data.userSettings} refresh={refresh}>
            {fetching ? (<LinearProgress />) : (<div className="fetching-placeholder"></div>)}
            {error && <Alert variant="filled" severity="error" action={<Icon onClick={() => setError('')}>close</Icon>}>{error}</Alert>}
            {data.weatherData && <Weather weather={data.weatherData} />}
        </Layout>
    );
}