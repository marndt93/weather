import "./solar.css";
import { useEffect, useState } from "react";
import type { IWeather } from "~/interfaces/weather";
import { SunPosition } from "../sun-position/sun-position";

export function Solar(props: {weather?: IWeather}) {

    /** The current date object */
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        setTimeout(() => {
            setDate(new Date());
        }, 1000);
    }, [date]);

    return(
        <div className="solar">
            <div className="solar-time flex justify-center">
                {date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2})}:{date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})}:{date.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2})}
            </div>
            <SunPosition sunrise={new Date(props.weather?.daily?.sunrise?.[0] || '')} sunset={new Date(props.weather?.daily?.sunset?.[0] || '')}/>
            <div className="flex flex-row justify-around">
                <div className="flex flex-col items-center">
                    <span className="sunrise material-symbols-outlined" style={{fontSize: '48px'}}>wb_twilight</span>
                    <div>
                        {props.weather?.daily?.sunrise?.[0].getHours()}:
                        {props.weather?.daily?.sunrise?.[0].getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="sunset flip material-symbols-outlined" style={{fontSize: '48px'}}>wb_twilight</span>
                    <div>
                        {props.weather?.daily?.sunset?.[0].getHours()}:
                        {props.weather?.daily?.sunset?.[0].getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})}
                    </div>
                </div>
            </div>
        </div>
    );
}