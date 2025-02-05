import "./overview.css";
import type { IWeather } from "~/interfaces/weather";
import { WeatherIcon } from "../weather-icon/weather-icon";
import { WeatherCodeMap } from "~/utils/helpers";

export function Overview(props: {weather?: IWeather}) {
    return (
        <div className="weather-overview">
            <div className="flex flex-row items-center gap-[50px] mt-[20px]">
                {WeatherCodeMap.get(Number(props.weather?.current.weatherCode)) && <WeatherIcon weatherCode={Number(props.weather?.current.weatherCode)} />}
                <div className="temp"><span>{props.weather?.current.temperature}</span><sup>{props.weather?.currentUnits.temperature_2m}</sup></div>
            </div>
            <div className="weather-code">{WeatherCodeMap.get(Number(props.weather?.current.weatherCode))}</div>
        </div>
    );
}