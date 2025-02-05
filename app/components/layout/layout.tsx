import "./layout.css";
import { Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, SwipeableDrawer } from "@mui/material";
import { useEffect, useState, type KeyboardEvent, type MouseEvent } from "react";
import { useNavigate } from "react-router";
import { UserSettings, type ILocation } from "~/interfaces/settings";
import { SETTINGS_STORAGE_KEY, WEATHER_DATA_CACHE_KEY } from "~/utils/constants";

export function Layout(props: {userSettings: UserSettings, refresh?: () => any, children: any}) {
    /** the navigator for switching routes. */
    const navigate = useNavigate();

    /** The current location. */
    const [location, setLocation] = useState<{city: string, coord: string}>({city: '', coord: ''});

    /** The menu state. */
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    /** The location menu state */
    const [locationMenuAnchorEl, setLocationMenuAnchorEl] = useState<null | HTMLElement>(null);

    /** Handle the menu close. */
    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    }

    /** Handle the location menu close. */
    const handleLocationMenuClose = () => {
        setLocationMenuAnchorEl(null);
    }

    /** Handle the menu open. */
    const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(event.currentTarget);
    }

    /** Handle the location menu open. */
    const openLocationMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setLocationMenuAnchorEl(event.currentTarget);
    }

    /** The state of the side drawer. */
    const [drawerState, setDrawerState] = useState(false);

    /** Event Handler for side drawer. */
    const toggleDrawerState = (state: boolean) => (event: KeyboardEvent | MouseEvent) => {
        setDrawerState(state);
    }

    const changeLocation = (location: string) => {
        const newSettings = new UserSettings({...props.userSettings});
        newSettings.selectedLocation = location;
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
        //settings have changed, so weather cache should be deleted.
        localStorage.removeItem(WEATHER_DATA_CACHE_KEY);
        handleLocationMenuClose();
        props.refresh && props.refresh();
    }

    useEffect(() => {
        if (props.userSettings) {
            const city = props.userSettings.selectedLocation;
            const longitude = String(props.userSettings?.locations?.find((x) => x.city === city)?.longitude || '');
            const latitude = String(props.userSettings?.locations?.find((x) => x.city === city)?.latitude || '');
            const coord = longitude && latitude ? `${latitude}, ${longitude}` : '';
            setLocation({city, coord});
        }
    }, [props.userSettings]);

    return (
        <div className="layout-container">
            <div className="layout-header">
                {/*Left aligned menu items */}
                <div className="layout-header-left">
                    <Icon className="menu-icon" onClick={toggleDrawerState(true)}>menu</Icon>
                    <div className="layout-details flex flex-col">
                        <span className="location">{location?.city}</span>
                        <span className="coord">{location?.coord}</span>
                    </div>
                </div>
                {/*Right aligned menu items */}
                <div className="layout-header-right">
                    <Icon onClick={openLocationMenu}>place</Icon>
                    <Menu id="location-menu"
                        anchorEl={locationMenuAnchorEl}
                        open={Boolean(locationMenuAnchorEl)}
                        onClose={handleLocationMenuClose}
                        className='location-menu'
                    >
                        {props.userSettings?.locations?.map((x: ILocation) => <MenuItem key={x.city} onClick={()=> changeLocation(x.city)}>{x.city}</MenuItem>)}
                    </Menu>
                    <Icon className="more-icon" onClick={openMenu}>more_vert</Icon>
                    <Menu id="menu"
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={handleMenuClose}
                        className='menu'
                    >
                        <MenuItem onClick={() => {handleMenuClose(); props.refresh && props.refresh()}}>Refresh</MenuItem>
                    </Menu>
                </div>
            </div>
            <SwipeableDrawer open={drawerState}
                anchor="left"
                onOpen={toggleDrawerState(true)}
                onClose={toggleDrawerState(false)}>
                    <div className="drawer-content">
                        <List>

                            <ListItem disablePadding onClick={() => navigate("/")}>
                                <ListItemButton>
                                    <ListItemIcon><span className="material-symbols-outlined material-icons">cloud</span></ListItemIcon>
                                    <ListItemText primary="Weather" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding onClick={() => navigate("/radar")}>
                                <ListItemButton>
                                    <ListItemIcon><span className="material-symbols-outlined material-icons">radar</span></ListItemIcon>
                                    <ListItemText primary="Radar" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding onClick={() => navigate("/settings")}>
                                <ListItemButton>
                                    <ListItemIcon><span className="material-symbols-outlined material-icons">settings</span></ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </ListItemButton>
                            </ListItem>

                        </List>
                    </div>
            </SwipeableDrawer>
            {props.children}
        </div>
    );
}