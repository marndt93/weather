import { useEffect, useState } from "react";
import { UserSettings, TemperatureUnit, SpeedUnit, PrecipitationUnit, type ILocation } from "~/interfaces/settings";
import { SETTINGS_STORAGE_KEY } from "~/utils/constants";
import { Layout } from "../layout/layout";

export function RadarViewer() {
    let [rerender, setRerender] = useState<number>(0);

    /** The user settings. */
    const [settings, setSettings] = useState<UserSettings>(new UserSettings({
        locations: [{city: '', latitude: 0, longitude: 0}],
        selectedLocation: '',
        temperatureUnit: TemperatureUnit.Celsius,
        speedUnit: SpeedUnit.Kmh,
        precipitationUnit: PrecipitationUnit.Mm
    }));

    /** Get the currently selected location. */
    const getLocation = (): ILocation => {
        return settings.locations.find((x) => x.city === settings.selectedLocation) || {} as ILocation;
    }

    /** The refresh callback. */
    const refresh = () => {
        setRerender(rerender += 1);
    }

    useEffect(() => {
        setSettings(JSON.parse(localStorage?.getItem(SETTINGS_STORAGE_KEY) || '{}'));
    }, [rerender])

    return (
        <Layout userSettings={settings} refresh={refresh}>
            <div className="w-[100%] h-[100%]">
                <iframe loading="lazy" style={{border: 'none', width: '100%', height: '100%'}} src={`https://embed.windy.com/embed2.html?lat=${getLocation().latitude}&lon=${getLocation().longitude}&detailLat=${getLocation().latitude}&detailLon=${getLocation().longitude}&zoom=10&level=surface&overlay=wind&product=ecmwf&calendar=new&type=map&location=coordinates&metricWind=default&metricTemp=default&radarRange=-1`}></iframe>
            </div>
        </Layout>
    );
}