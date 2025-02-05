import "./sun-position.css";
import { useEffect, useRef, useState } from "react";

export function SunPosition(props: {sunrise: Date; sunset: Date;}) {
    const ref = useRef<any>(null);
    const start = new Date(new Date().setHours(0, 0, 0, 0));
    const end = new Date(new Date().setHours(23, 59, 59, 999));
    const dayMs = 86400000;
    const halfHourMs = 1800000;

    const [current, setCurrent] = useState<Date>(new Date());

    const [regions, setRegions] = useState<{
        morning: number;
        half: number;
        day: number,
        evening: number,
        sunPosition: number
    }>();

    useEffect(() => {
        window.addEventListener('resize', () => setCurrent(new Date()));
        setTimeout(() => {
            // update the sun position every minute.
            setCurrent(new Date());
        }, 60000);
        const morning = (((props.sunrise.getTime() - start.getTime() - halfHourMs) / dayMs) * 100);
        const day = (props.sunset.getTime() - props.sunrise.getTime()) / dayMs * 100;
        const evening = (((end.getTime() - props.sunset.getTime() - halfHourMs) / dayMs) * 100);
        const divWidth = ref.current ? ref.current?.offsetWidth : 0;
        // -4 to offset for the element width (8px).
        const sunPosition = (divWidth * ((current.getTime() - start.getTime()) / dayMs)) -4;
        setRegions({morning, half: 2.083, day, evening, sunPosition});
    }, [current]);

    return (
        <div ref={ref} className="sun-position flex flex-row w-[100%]">
            <div className="sun" style={{left: `${regions?.sunPosition}px`}}><div className="inside"></div></div>
            <div className="night" style={{width: `${regions?.morning}%`}}></div>
            <div className="half" style={{width: `${regions?.half}%`}}></div>
            <div className="day" style={{width: `${regions?.day}%`}}></div>
            <div className="half" style={{width: `${regions?.half}%`}}></div>
            <div className="night" style={{width: `${regions?.evening}%`}}></div>
        </div>
    );
}