import "./hourly.css";
import { useEffect, useState } from "react";
import type { IHourly } from "~/interfaces/hourly";
import type { IWeather } from "~/interfaces/weather";
import { getDayOfWeek, getWindDirection, WeatherCodeMap } from "~/utils/helpers";
import { DetailItem } from "../detail-item/detail-item";
import { WeatherIcon } from "../weather-icon/weather-icon";

export function Hourly(props: {weather?: IWeather, hourly: IHourly[]}) {
    /** the hourly weather details. */
    const [details, setDetails] = useState<IHourly[]>([]);


    useEffect(() => {
        setDetails(props.hourly);
    }, [props.hourly]);

    return (
        <div className="hourly">
            <div className="flex flex-row gap-3 p-2">
                {details.map((detail) =>
                    <div key={detail.date.getTime()} className="hourly-item flex flex-col">
                        <div className="time flex flex-row">
                            <DetailItem icon="schedule" iconSize={20} value={`${detail.date.getHours()}:00`} />
                        </div>
                        {WeatherCodeMap.get(Number(detail.weatherCode)) && <WeatherIcon weatherCode={Number(detail.weatherCode)} size={32} />}
                        <div className="details flex flex-row justify-center">
                            <DetailItem icon="thermometer" iconSize={18} value={detail.temperature} />
                        </div>
                        <div className="details flex flex-row justify-center">
                            <DetailItem icon="air" iconSize={18} value={detail.wind} />
                        </div>
                        <div className="details flex flex-row justify-center">{detail.windDirection}</div>
                    </div>
                )}
            </div>
        </div>
    );
}