import "./settings.css";
import { Button, FormControl, IconButton, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { PrecipitationUnit, SpeedUnit, TemperatureUnit, UserSettings, type ILocation, type ISettings } from "~/interfaces/settings";
import { SETTINGS_STORAGE_KEY, WEATHER_DATA_CACHE_KEY } from "~/utils/constants"
import { Layout } from "../layout/layout";

export function Settings() {
    useEffect(() => {
        setSettings(JSON.parse(localStorage?.getItem(SETTINGS_STORAGE_KEY) || '{}'));
    }, []);

    /** The current location. */
    const [location, setLocation] = useState<ILocation>({
        city: '',
        latitude: 0,
        longitude: 0
    });

    /** The user settings. */
    const [settings, setSettings] = useState<UserSettings>(new UserSettings({
        locations: [{city: '', latitude: 0, longitude: 0}],
        selectedLocation: '',
        temperatureUnit: TemperatureUnit.Celsius,
        speedUnit: SpeedUnit.Kmh,
        precipitationUnit: PrecipitationUnit.Mm
    }));

    /** Handle temperature setting change. */
    const handleTempChange = (event: SelectChangeEvent) => {
        const newSettings = new UserSettings({...settings});
        newSettings.temperatureUnit = event.target.value as TemperatureUnit;
        setSettings(newSettings);
        updateSettings(newSettings);
    }

    /** Handle speed setting change. */
    const handleSpeedChange = (event: SelectChangeEvent) => {
        const newSettings = new UserSettings({...settings});
        newSettings.speedUnit = event.target.value as SpeedUnit;
        setSettings(newSettings);
        updateSettings(newSettings);
    }

    /** Handle precipitation setting change. */
    const handlePrecipChange = (event: SelectChangeEvent) => {
        const newSettings = new UserSettings({...settings});
        newSettings.precipitationUnit = event.target.value as PrecipitationUnit;
        setSettings(newSettings);
        updateSettings(newSettings);
    }

    /** Update settings in local storage. */
    const updateSettings = (updatedSettings: ISettings) => {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
        // settings have change, so weather cache should be deleted.
        localStorage.removeItem(WEATHER_DATA_CACHE_KEY);
    }

    /** Add a new location to the configured locations list in the settings. */
    const addLocation = () => {
        const newSettings = new UserSettings({...settings});
        newSettings.locations.push(location);
        newSettings.selectedLocation = location.city;
        setSettings(newSettings);
        updateSettings(newSettings);

        setLocation({
            city: '',
            latitude: 0,
            longitude: 0
        });
    }

    /** Request the user's current location and set the latitude/longitude values */
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((x: GeolocationPosition) => {
            setLocation({city: location.city, latitude: Number(x.coords.latitude.toFixed(4)), longitude: Number(x.coords.longitude.toFixed(4))});
        });
    }

    return(
        <Layout userSettings={settings}>
            <div className="settings">
                <div className="settings-title">Settings</div>
                <div>Units</div>
                <div className="flex flex-row items-center gap-[10px] p-[10px]">
                    <span>Temperature</span>
                    <FormControl>
                        <Select
                            id="temp-select"
                            value={settings.temperatureUnit}
                            style={{width: '150px'}}
                            onChange={handleTempChange}>
                            <MenuItem value={TemperatureUnit.Fahrenheit}>Fahrenheit</MenuItem>
                            <MenuItem value={TemperatureUnit.Celsius}>Celsius</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="flex flex-row items-center gap-[10px] p-[10px]">
                    <span>Speed</span>
                    <FormControl>
                        <Select
                            id="speed-select"
                            value={settings.speedUnit}
                            style={{width: '100px'}}
                            onChange={handleSpeedChange}>
                            <MenuItem value={SpeedUnit.Mph}>Mph</MenuItem>
                            <MenuItem value={SpeedUnit.Kmh}>Kmh</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="flex flex-row items-center gap-[10px] p-[10px]">
                    <span>Precipitation</span>
                    <FormControl>
                        <Select
                            id="prec-select"
                            value={settings.precipitationUnit}
                            style={{width: '100px'}}
                            onChange={handlePrecipChange}>
                            <MenuItem value={PrecipitationUnit.Inch}>Inch</MenuItem>
                            <MenuItem value={PrecipitationUnit.Mm}>mm</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="pt-[20px]">Location</div>
                <TextField value={location.city} onChange={(el) => setLocation({...location, city: el.target.value})} label="City" variant="outlined" style={{width: '100%', padding: '5px'}} />
                <TextField value={location.latitude} onChange={(el) => setLocation({...location, latitude: Number(el.target.value)})} label="Latitude" variant="outlined" style={{width: '50%', padding: '5px'}} />
                <TextField value={location.longitude} onChange={(el) => setLocation({...location, longitude: Number(el.target.value)})} label="Longitude" variant="outlined" style={{width: '50%', padding: '5px'}} />
                <Button onClick={addLocation} disabled={!location.city || ! location.latitude || !location.longitude} variant="contained" style={{margin: '5px'}}>Add Location</Button>
                <IconButton onClick={getLocation}><span className="material-symbols-outlined">my_location</span></IconButton>
            </div>
        </Layout>
    );

}