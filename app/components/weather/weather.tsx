import "./weather.css";
import type { IWeather } from "~/interfaces/weather";
import { Overview } from "../overview/overview";
import { Details } from "../details/details";
import { Daily } from "../daily/daily";
import { Solar } from "../solar/solar";

export function Weather(props: {weather?: IWeather}) {
    return(
        <div className="weather-container">
            <Overview weather={props.weather} /><hr />
            <Details weather={props.weather} /><hr />
            <Daily weather={props.weather} /><hr />
            <Solar weather={props.weather} />
        </div>
    )
}