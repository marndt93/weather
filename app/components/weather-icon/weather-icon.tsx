import { getIcon } from '~/utils/helpers';

export function WeatherIcon(props: {weatherCode: number, size?: number}) {
    const icon: string = getIcon(props.weatherCode);
    const size = props.size || 65;

    return (
        <div className="weather-icon">
            <span className="material-symbols-outlined" style={{fontSize: `${size}px`}}>{icon}</span>
        </div>
    )
}