var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useParams, useLoaderData, useActionData, useMatches, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect, useRef } from "react";
import { FormControl, Select, MenuItem, Icon, Menu, SwipeableDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, LinearProgress, Alert, TextField, Button, IconButton } from "@mui/material";
import axios from "axios";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  },
  // material icons
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
  }
];
function Layout$1({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout: Layout$1,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
class UserSettings {
  constructor(settings) {
    __publicField(this, "locations");
    __publicField(this, "selectedLocation");
    __publicField(this, "temperatureUnit");
    __publicField(this, "speedUnit");
    __publicField(this, "precipitationUnit");
    this.locations = settings.locations || [];
    this.selectedLocation = settings.selectedLocation || "";
    this.temperatureUnit = settings.temperatureUnit;
    this.speedUnit = settings.speedUnit;
    this.precipitationUnit = settings.precipitationUnit;
  }
}
var TemperatureUnit = /* @__PURE__ */ ((TemperatureUnit2) => {
  TemperatureUnit2["Fahrenheit"] = "fahrenheit";
  TemperatureUnit2["Celsius"] = "celsius";
  return TemperatureUnit2;
})(TemperatureUnit || {});
var SpeedUnit = /* @__PURE__ */ ((SpeedUnit2) => {
  SpeedUnit2["Kmh"] = "kmh";
  SpeedUnit2["Mph"] = "mph";
  return SpeedUnit2;
})(SpeedUnit || {});
var PrecipitationUnit = /* @__PURE__ */ ((PrecipitationUnit2) => {
  PrecipitationUnit2["Inch"] = "inch";
  PrecipitationUnit2["Mm"] = "mm";
  return PrecipitationUnit2;
})(PrecipitationUnit || {});
const SETTINGS_STORAGE_KEY = "SETTINGS_STORAGE_KEY";
const WEATHER_DATA_CACHE_KEY = "WEATHER_DATA_CACHE";
const getWindDirection = (dir) => {
  let direction = "N";
  if (dir >= 349 || dir < 11) {
    direction = "N";
  } else if (dir >= 11 && dir < 33) {
    direction = "NNE";
  } else if (dir >= 33 && dir < 56) {
    direction = "NE";
  } else if (dir >= 56 && dir < 78) {
    direction = "ENE";
  } else if (dir >= 78 && dir < 101) {
    direction = "E";
  } else if (dir >= 101 && dir < 123) {
    direction = "ESE";
  } else if (dir >= 123 && dir < 146) {
    direction = "SE";
  } else if (dir >= 146 && dir < 168) {
    direction = "SSE";
  } else if (dir >= 168 && dir < 191) {
    direction = "S";
  } else if (dir >= 191 && dir < 213) {
    direction = "SSW";
  } else if (dir >= 213 && dir < 236) {
    direction = "SW";
  } else if (dir >= 236 && dir < 258) {
    direction = "WSW";
  } else if (dir >= 258 && dir < 281) {
    direction = "W";
  } else if (dir >= 281 && dir < 303) {
    direction = "WNW";
  } else if (dir >= 303 && dir < 326) {
    direction = "NW";
  } else if (dir >= 326 && dir < 348) {
    direction = "NNW";
  }
  return direction;
};
const validSettings = (s) => {
  let isValid = true;
  const settings = new UserSettings(s);
  Object.keys(settings).forEach((key) => {
    const val = settings[key];
    if (val === void 0 || val === null || val === "") {
      isValid = false;
    }
  });
  return isValid;
};
const getDayOfWeek = (x) => {
  switch (x) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "";
  }
};
const getIcon = (weatherCode) => {
  let icon = "";
  switch (weatherCode) {
    case 0:
    case 1: {
      icon = "sunny";
      break;
    }
    case 2: {
      icon = "partly_cloudy_day";
      break;
    }
    case 3: {
      icon = "cloud";
      break;
    }
    case 45:
    case 48: {
      icon = "foggy";
      break;
    }
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82: {
      icon = "rainy";
      break;
    }
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86: {
      icon = "weather_snowy";
      break;
    }
    case 95:
    case 96:
    case 99: {
      icon = "thunderstorm";
      break;
    }
  }
  return icon;
};
const WeatherCodeMap = /* @__PURE__ */ new Map([
  [-1, ""],
  [0, "Clear Sky"],
  [1, "Mainly Clear"],
  [2, "Partly Cloudy"],
  [3, "Overcast"],
  [45, "Foggy"],
  [48, "Depositing rime fog"],
  [51, "Light Drizzle"],
  [53, "Drizzle"],
  [55, "Drizzle"],
  [56, "Freezing, light drizzle"],
  [57, "Freezing drizzle"],
  [61, "Light rain"],
  [63, "Rain"],
  [65, "Heavy rain"],
  [66, "Freezing, light rain"],
  [67, "Freezing rain"],
  [71, "Light snow"],
  [73, "Snow"],
  [75, "Heavy snow"],
  [77, "Snow grains"],
  [80, "Light showers"],
  [81, "Showers"],
  [82, "Heavy showers"],
  [85, "Light snow showers"],
  [86, "Snow showers"],
  [95, "Thunderstorm"],
  [96, "Thunderstorm with hail"],
  [99, "Thunderstorm with hail"]
]);
function WeatherIcon(props) {
  const icon = getIcon(props.weatherCode);
  const size = props.size || 65;
  return /* @__PURE__ */ jsx("div", { className: "weather-icon", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: `${size}px` }, children: icon }) });
}
function Overview(props) {
  var _a, _b, _c, _d, _e;
  return /* @__PURE__ */ jsxs("div", { className: "weather-overview", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-[50px] mt-[20px]", children: [
      WeatherCodeMap.get(Number((_a = props.weather) == null ? void 0 : _a.current.weatherCode)) && /* @__PURE__ */ jsx(WeatherIcon, { weatherCode: Number((_b = props.weather) == null ? void 0 : _b.current.weatherCode) }),
      /* @__PURE__ */ jsxs("div", { className: "temp", children: [
        /* @__PURE__ */ jsx("span", { children: (_c = props.weather) == null ? void 0 : _c.current.temperature }),
        /* @__PURE__ */ jsx("sup", { children: (_d = props.weather) == null ? void 0 : _d.currentUnits.temperature_2m })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "weather-code", children: WeatherCodeMap.get(Number((_e = props.weather) == null ? void 0 : _e.current.weatherCode)) })
  ] });
}
function DetailItem(props) {
  return /* @__PURE__ */ jsxs("div", { className: "detail-item flex flex-row gap-[5px]", children: [
    /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", style: { fontSize: `${props.iconSize || 26}px`, height: `${props.iconSize || 26}px` }, children: props.icon }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { children: props.before }),
      /* @__PURE__ */ jsx("span", { children: props.value }),
      /* @__PURE__ */ jsx("span", { children: props.after })
    ] })
  ] });
}
function Details(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const windDirection = getWindDirection(Number((_a = props.weather) == null ? void 0 : _a.current.windDirection));
  const windValue = `${(_b = props.weather) == null ? void 0 : _b.current.windSpeed} ${(_c = props.weather) == null ? void 0 : _c.currentUnits.wind_speed_10m} ${windDirection}`;
  const gust = `${(_d = props.weather) == null ? void 0 : _d.current.windGusts} ${(_e = props.weather) == null ? void 0 : _e.currentUnits.wind_speed_10m}`;
  const feelsLike = `${(_f = props.weather) == null ? void 0 : _f.current.feelsLike}${(_g = props.weather) == null ? void 0 : _g.currentUnits.apparent_temperature}`;
  const temperature = Number((_h = props.weather) == null ? void 0 : _h.current.temperature);
  const precipitationChance = `(${Number((_i = props.weather) == null ? void 0 : _i.current.precipitationProbability)}${(_j = props.weather) == null ? void 0 : _j.currentUnits.precipitation_probability} chance)`;
  const precipitation = `${(_k = props.weather) == null ? void 0 : _k.current.precipitation}${(_l = props.weather) == null ? void 0 : _l.currentUnits.precipitation}`;
  const precipitationIcon = temperature > 0 ? "rainy" : "weather_snowy";
  const humidity = `${(_m = props.weather) == null ? void 0 : _m.current.humidity}${(_n = props.weather) == null ? void 0 : _n.currentUnits.relative_humidity_2m}`;
  const pressure = `${(_o = props.weather) == null ? void 0 : _o.current.pressure} ${(_p = props.weather) == null ? void 0 : _p.currentUnits.surface_pressure}`;
  return /* @__PURE__ */ jsx("div", { className: "weather-details", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-around w-[100%]", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx(DetailItem, { icon: "device_thermostat", before: "Feels Like ", value: feelsLike }),
      /* @__PURE__ */ jsx(DetailItem, { icon: precipitationIcon, after: ` ${precipitationChance}`, value: precipitation }),
      /* @__PURE__ */ jsx(DetailItem, { icon: "water_drop", after: " Humidity", value: humidity })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx(DetailItem, { icon: "air", value: windValue }),
      /* @__PURE__ */ jsx(DetailItem, { icon: "airwave", after: " Gusts", value: gust }),
      /* @__PURE__ */ jsx(DetailItem, { icon: "readiness_score", value: pressure })
    ] })
  ] }) });
}
function Hourly(props) {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    setDetails(props.hourly);
  }, [props.hourly]);
  return /* @__PURE__ */ jsx("div", { className: "hourly", children: /* @__PURE__ */ jsx("div", { className: "flex flex-row gap-3 p-2", children: details.map(
    (detail) => /* @__PURE__ */ jsxs("div", { className: "hourly-item flex flex-col", children: [
      /* @__PURE__ */ jsx("div", { className: "time flex flex-row", children: /* @__PURE__ */ jsx(DetailItem, { icon: "schedule", iconSize: 20, value: `${detail.date.getHours()}:00` }) }),
      WeatherCodeMap.get(Number(detail.weatherCode)) && /* @__PURE__ */ jsx(WeatherIcon, { weatherCode: Number(detail.weatherCode), size: 32 }),
      /* @__PURE__ */ jsx("div", { className: "details flex flex-row justify-center", children: /* @__PURE__ */ jsx(DetailItem, { icon: "thermometer", iconSize: 18, value: detail.temperature }) }),
      /* @__PURE__ */ jsx("div", { className: "details flex flex-row justify-center", children: /* @__PURE__ */ jsx(DetailItem, { icon: "air", iconSize: 18, value: detail.wind }) }),
      /* @__PURE__ */ jsx("div", { className: "details flex flex-row justify-center", children: detail.windDirection })
    ] }, detail.date.getTime())
  ) }) });
}
function Daily(props) {
  var _a, _b, _c, _d, _e;
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Today");
  const dayChange = (event) => {
    setDay(event.target.value);
  };
  const [details, setDetails] = useState({});
  const [hourly, setHourly] = useState([]);
  const generateData = () => {
    var _a2, _b2, _c2, _d2, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    const i = days.length ? days.findIndex((x) => x === day) : 0;
    const newData = {
      temperature: Number((Number((_b2 = (_a2 = props.weather) == null ? void 0 : _a2.daily.temperatureMax) == null ? void 0 : _b2[i]) + Number((_d2 = (_c2 = props.weather) == null ? void 0 : _c2.daily.temperatureMin) == null ? void 0 : _d2[i]) / 2).toFixed(1)),
      temperatureMax: ((_f = (_e2 = props.weather) == null ? void 0 : _e2.daily.temperatureMax) == null ? void 0 : _f[i]) || 0,
      temperatureMin: ((_h = (_g = props.weather) == null ? void 0 : _g.daily.temperatureMin) == null ? void 0 : _h[i]) || 0,
      precipitation: ((_j = (_i = props.weather) == null ? void 0 : _i.daily.precipitation) == null ? void 0 : _j[i]) || 0,
      precipitationProbability: ((_l = (_k = props.weather) == null ? void 0 : _k.daily.precipitationProbability) == null ? void 0 : _l[i]) || 0,
      weatherCode: ((_n = (_m = props.weather) == null ? void 0 : _m.daily.weatherCode) == null ? void 0 : _n[i]) || 0,
      windSpeed: ((_p = (_o = props.weather) == null ? void 0 : _o.daily.windSpeed) == null ? void 0 : _p[i]) || 0,
      windDirection: ((_r = (_q = props.weather) == null ? void 0 : _q.daily.windDirection) == null ? void 0 : _r[i]) || 0,
      windGusts: ((_t = (_s = props.weather) == null ? void 0 : _s.daily.windGusts) == null ? void 0 : _t[i]) || 0
    };
    const hourlyDate = new Date((/* @__PURE__ */ new Date()).getTime() + 864e5 * i);
    const hourlyData = [];
    const units = (_u = props.weather) == null ? void 0 : _u.hourlyUnits;
    (_w = (_v = props.weather) == null ? void 0 : _v.hourly.time) == null ? void 0 : _w.forEach((x, index) => {
      var _a3, _b3, _c3, _d3, _e3, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2;
      if (x.getDate() === hourlyDate.getDate()) {
        const data = {
          date: x,
          temperature: `${(_b3 = (_a3 = props.weather) == null ? void 0 : _a3.hourly.temperature) == null ? void 0 : _b3[index]} ${units.temperature_2m}`,
          precipitation: `${(_d3 = (_c3 = props.weather) == null ? void 0 : _c3.hourly.precipitation) == null ? void 0 : _d3[index]} ${units.precipitation}`,
          precipitationChance: `${(_f2 = (_e3 = props.weather) == null ? void 0 : _e3.hourly.precipitationProbability) == null ? void 0 : _f2[index]} ${units.precipitation_probability}`,
          weatherCode: Number((_h2 = (_g2 = props.weather) == null ? void 0 : _g2.hourly.weatherCode) == null ? void 0 : _h2[index]),
          wind: `${(_j2 = (_i2 = props.weather) == null ? void 0 : _i2.hourly.windSpeed) == null ? void 0 : _j2[index]} ${units.wind_speed_10m}`,
          windDirection: getWindDirection(Number((_l2 = (_k2 = props.weather) == null ? void 0 : _k2.hourly.windDirection) == null ? void 0 : _l2[index])),
          gusts: `${(_n2 = (_m2 = props.weather) == null ? void 0 : _m2.hourly.windGusts) == null ? void 0 : _n2[index]} ${units.wind_gusts_10m}`
        };
        hourlyData.push(data);
      }
    });
    setHourly(hourlyData);
    setDetails(newData);
  };
  useEffect(() => {
    console.log(props.weather);
    if (!days.length) {
      const dayOptions = ["Today", "Tomorrow"];
      let date = new Date((/* @__PURE__ */ new Date()).getTime() + 864e5 + 864e5);
      for (let index = 0; index < 5; index++) {
        dayOptions.push(getDayOfWeek(date.getDay()));
        date = new Date(date.getTime() + 864e5);
      }
      setDays(dayOptions);
    }
    generateData();
  }, [day]);
  return /* @__PURE__ */ jsxs("div", { className: "daily", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-around w-[100%]", children: [
      /* @__PURE__ */ jsx(FormControl, { variant: "standard", sx: { m: 1, minWidht: 120 }, size: "small", children: /* @__PURE__ */ jsx(
        Select,
        {
          id: "select",
          value: day,
          onChange: dayChange,
          children: days.map((x) => /* @__PURE__ */ jsx(MenuItem, { value: x, children: x }, x))
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "w-[150px]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "daily-details", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-around w-[100%]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx(DetailItem, { icon: "device_thermostat", value: `${details.temperature} ${(_a = props.weather) == null ? void 0 : _a.currentUnits.temperature_2m}` }),
        /* @__PURE__ */ jsx(DetailItem, { icon: Number(details.temperature) > 0 ? "rainy" : "weather_snowy", after: ` (${details.precipitationProbability}${(_b = props.weather) == null ? void 0 : _b.currentUnits.precipitation_probability} chance)`, value: `${details.precipitation}${(_c = props.weather) == null ? void 0 : _c.currentUnits.precipitation}` })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx(DetailItem, { icon: "air", value: `${details.windSpeed} ${(_d = props.weather) == null ? void 0 : _d.currentUnits.wind_speed_10m} ${getWindDirection(Number(details.windDirection))}` }),
        /* @__PURE__ */ jsx(DetailItem, { icon: "airwave", value: `${details.windGusts} ${(_e = props.weather) == null ? void 0 : _e.currentUnits.wind_speed_10m}`, after: " Gusts" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Hourly, { weather: props.weather, hourly })
  ] });
}
function SunPosition(props) {
  const ref = useRef(null);
  const start = new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
  const end = new Date((/* @__PURE__ */ new Date()).setHours(23, 59, 59, 999));
  const dayMs = 864e5;
  const halfHourMs = 18e5;
  const [current, setCurrent] = useState(/* @__PURE__ */ new Date());
  const [regions, setRegions] = useState();
  useEffect(() => {
    var _a;
    window.addEventListener("resize", () => setCurrent(/* @__PURE__ */ new Date()));
    setTimeout(() => {
      setCurrent(/* @__PURE__ */ new Date());
    }, 6e4);
    const morning = (props.sunrise.getTime() - start.getTime() - halfHourMs) / dayMs * 100;
    const day = (props.sunset.getTime() - props.sunrise.getTime()) / dayMs * 100;
    const evening = (end.getTime() - props.sunset.getTime() - halfHourMs) / dayMs * 100;
    const divWidth = ref.current ? (_a = ref.current) == null ? void 0 : _a.offsetWidth : 0;
    const sunPosition = divWidth * ((current.getTime() - start.getTime()) / dayMs) - 4;
    setRegions({ morning, half: 2.083, day, evening, sunPosition });
  }, [current]);
  return /* @__PURE__ */ jsxs("div", { ref, className: "sun-position flex flex-row w-[100%]", children: [
    /* @__PURE__ */ jsx("div", { className: "sun", style: { left: `${regions == null ? void 0 : regions.sunPosition}px` }, children: /* @__PURE__ */ jsx("div", { className: "inside" }) }),
    /* @__PURE__ */ jsx("div", { className: "night", style: { width: `${regions == null ? void 0 : regions.morning}%` } }),
    /* @__PURE__ */ jsx("div", { className: "half", style: { width: `${regions == null ? void 0 : regions.half}%` } }),
    /* @__PURE__ */ jsx("div", { className: "day", style: { width: `${regions == null ? void 0 : regions.day}%` } }),
    /* @__PURE__ */ jsx("div", { className: "half", style: { width: `${regions == null ? void 0 : regions.half}%` } }),
    /* @__PURE__ */ jsx("div", { className: "night", style: { width: `${regions == null ? void 0 : regions.evening}%` } })
  ] });
}
function Solar(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
  const [date, setDate] = useState(/* @__PURE__ */ new Date());
  useEffect(() => {
    setTimeout(() => {
      setDate(/* @__PURE__ */ new Date());
    }, 1e3);
  }, [date]);
  return /* @__PURE__ */ jsxs("div", { className: "solar", children: [
    /* @__PURE__ */ jsxs("div", { className: "solar-time flex justify-center", children: [
      date.getHours().toLocaleString("en-US", { minimumIntegerDigits: 2 }),
      ":",
      date.getMinutes().toLocaleString("en-US", { minimumIntegerDigits: 2 }),
      ":",
      date.getSeconds().toLocaleString("en-US", { minimumIntegerDigits: 2 })
    ] }),
    /* @__PURE__ */ jsx(SunPosition, { sunrise: new Date(((_c = (_b = (_a = props.weather) == null ? void 0 : _a.daily) == null ? void 0 : _b.sunrise) == null ? void 0 : _c[0]) || ""), sunset: new Date(((_f = (_e = (_d = props.weather) == null ? void 0 : _d.daily) == null ? void 0 : _e.sunset) == null ? void 0 : _f[0]) || "") }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-around", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "sunrise material-symbols-outlined", style: { fontSize: "48px" }, children: "wb_twilight" }),
        /* @__PURE__ */ jsxs("div", { children: [
          (_i = (_h = (_g = props.weather) == null ? void 0 : _g.daily) == null ? void 0 : _h.sunrise) == null ? void 0 : _i[0].getHours(),
          ":",
          (_l = (_k = (_j = props.weather) == null ? void 0 : _j.daily) == null ? void 0 : _k.sunrise) == null ? void 0 : _l[0].getMinutes().toLocaleString("en-US", { minimumIntegerDigits: 2 })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "sunset flip material-symbols-outlined", style: { fontSize: "48px" }, children: "wb_twilight" }),
        /* @__PURE__ */ jsxs("div", { children: [
          (_o = (_n = (_m = props.weather) == null ? void 0 : _m.daily) == null ? void 0 : _n.sunset) == null ? void 0 : _o[0].getHours(),
          ":",
          (_r = (_q = (_p = props.weather) == null ? void 0 : _p.daily) == null ? void 0 : _q.sunset) == null ? void 0 : _r[0].getMinutes().toLocaleString("en-US", { minimumIntegerDigits: 2 })
        ] })
      ] })
    ] })
  ] });
}
function Weather(props) {
  return /* @__PURE__ */ jsxs("div", { className: "weather-container", children: [
    /* @__PURE__ */ jsx(Overview, { weather: props.weather }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx(Details, { weather: props.weather }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx(Daily, { weather: props.weather }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx(Solar, { weather: props.weather })
  ] });
}
function Layout(props) {
  var _a, _b;
  const navigate = useNavigate();
  const [location, setLocation] = useState({ city: "", coord: "" });
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [locationMenuAnchorEl, setLocationMenuAnchorEl] = useState(null);
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleLocationMenuClose = () => {
    setLocationMenuAnchorEl(null);
  };
  const openMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const openLocationMenu = (event) => {
    setLocationMenuAnchorEl(event.currentTarget);
  };
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawerState = (state) => (event) => {
    setDrawerState(state);
  };
  const changeLocation = (location2) => {
    const newSettings = new UserSettings({ ...props.userSettings });
    newSettings.selectedLocation = location2;
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    localStorage.removeItem(WEATHER_DATA_CACHE_KEY);
    handleLocationMenuClose();
    props.refresh && props.refresh();
  };
  useEffect(() => {
    var _a2, _b2, _c, _d, _e, _f;
    if (props.userSettings) {
      const city = props.userSettings.selectedLocation;
      const longitude = String(((_c = (_b2 = (_a2 = props.userSettings) == null ? void 0 : _a2.locations) == null ? void 0 : _b2.find((x) => x.city === city)) == null ? void 0 : _c.longitude) || "");
      const latitude = String(((_f = (_e = (_d = props.userSettings) == null ? void 0 : _d.locations) == null ? void 0 : _e.find((x) => x.city === city)) == null ? void 0 : _f.latitude) || "");
      const coord = longitude && latitude ? `${latitude}, ${longitude}` : "";
      setLocation({ city, coord });
    }
  }, [props.userSettings]);
  return /* @__PURE__ */ jsxs("div", { className: "layout-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "layout-header", children: [
      /* @__PURE__ */ jsxs("div", { className: "layout-header-left", children: [
        /* @__PURE__ */ jsx(Icon, { className: "menu-icon", onClick: toggleDrawerState(true), children: "menu" }),
        /* @__PURE__ */ jsxs("div", { className: "layout-details flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "location", children: location == null ? void 0 : location.city }),
          /* @__PURE__ */ jsx("span", { className: "coord", children: location == null ? void 0 : location.coord })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "layout-header-right", children: [
        /* @__PURE__ */ jsx(Icon, { onClick: openLocationMenu, children: "place" }),
        /* @__PURE__ */ jsx(
          Menu,
          {
            id: "location-menu",
            anchorEl: locationMenuAnchorEl,
            open: Boolean(locationMenuAnchorEl),
            onClose: handleLocationMenuClose,
            className: "location-menu",
            children: (_b = (_a = props.userSettings) == null ? void 0 : _a.locations) == null ? void 0 : _b.map((x) => /* @__PURE__ */ jsx(MenuItem, { onClick: () => changeLocation(x.city), children: x.city }, x.city))
          }
        ),
        /* @__PURE__ */ jsx(Icon, { className: "more-icon", onClick: openMenu, children: "more_vert" }),
        /* @__PURE__ */ jsx(
          Menu,
          {
            id: "menu",
            anchorEl: menuAnchorEl,
            open: Boolean(menuAnchorEl),
            onClose: handleMenuClose,
            className: "menu",
            children: /* @__PURE__ */ jsx(MenuItem, { onClick: () => {
              handleMenuClose();
              props.refresh && props.refresh();
            }, children: "Refresh" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      SwipeableDrawer,
      {
        open: drawerState,
        anchor: "left",
        onOpen: toggleDrawerState(true),
        onClose: toggleDrawerState(false),
        children: /* @__PURE__ */ jsx("div", { className: "drawer-content", children: /* @__PURE__ */ jsxs(List, { children: [
          /* @__PURE__ */ jsx(ListItem, { disablePadding: true, onClick: () => navigate("/"), children: /* @__PURE__ */ jsxs(ListItemButton, { children: [
            /* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined material-icons", children: "cloud" }) }),
            /* @__PURE__ */ jsx(ListItemText, { primary: "Weather" })
          ] }) }),
          /* @__PURE__ */ jsx(ListItem, { disablePadding: true, onClick: () => navigate("/radar"), children: /* @__PURE__ */ jsxs(ListItemButton, { children: [
            /* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined material-icons", children: "radar" }) }),
            /* @__PURE__ */ jsx(ListItemText, { primary: "Radar" })
          ] }) }),
          /* @__PURE__ */ jsx(ListItem, { disablePadding: true, onClick: () => navigate("/settings"), children: /* @__PURE__ */ jsxs(ListItemButton, { children: [
            /* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined material-icons", children: "settings" }) }),
            /* @__PURE__ */ jsx(ListItemText, { primary: "Settings" })
          ] }) })
        ] }) })
      }
    ),
    props.children
  ] });
}
function Main() {
  const navigate = useNavigate();
  const API_STRING = "https://api.open-meteo.com/v1/forecast";
  const firstRender = useRef(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState({});
  const weatherVariables = ["temperature_2m", "apparent_temperature", "precipitation", "precipitation_probability", "weather_code", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m", "relative_humidity_2m", "surface_pressure"];
  const dailyWeatherVariables = ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "daylight_duration", "precipitation_sum", "precipitation_probability_max", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant"];
  const refresh = () => {
    localStorage.removeItem(WEATHER_DATA_CACHE_KEY);
    firstRender.current = true;
    setData({});
  };
  const isValidCache = () => {
    var _a, _b;
    let valid = true;
    const cache = (_a = JSON.parse(localStorage.getItem(WEATHER_DATA_CACHE_KEY) || "{}")) == null ? void 0 : _a.data;
    const cachedTime = new Date((_b = cache == null ? void 0 : cache.current) == null ? void 0 : _b.time).getTime();
    const currentTime = (/* @__PURE__ */ new Date()).getTime();
    if (currentTime - cachedTime > 36e5 || !cache) {
      valid = false;
    }
    return valid;
  };
  const updateData = (result, userSettings) => {
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
          windGusts: result.data.current.wind_gusts_10m
        },
        currentUnits: result.data.current_units,
        hourly: {
          time: result.data.hourly.time.map((x) => new Date(new Date(x).getTime() + (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4)),
          temperature: result.data.hourly.temperature_2m,
          feelsLike: result.data.hourly.apparent_temperature,
          humidity: result.data.hourly.relative_humidity_2m,
          precipitation: result.data.hourly.precipitation,
          precipitationProbability: result.data.hourly.precipitation_probability,
          pressure: result.data.hourly.surface_pressure,
          weatherCode: result.data.hourly.weather_code,
          windSpeed: result.data.hourly.wind_speed_10m,
          windDirection: result.data.hourly.wind_direction_10m,
          windGusts: result.data.hourly.wind_gusts_10m
        },
        hourlyUnits: result.data.hourly_units,
        daily: {
          daylightDuration: result.data.daily.daylight_duration,
          precipitation: result.data.daily.precipitation,
          precipitationProbability: result.data.daily.precipitation_probability,
          sunrise: result.data.daily.sunrise.map((x) => new Date(x)),
          sunset: result.data.daily.sunset.map((x) => new Date(x)),
          temperatureMin: result.data.daily.temperature_2m_min,
          temperatureMax: result.data.daily.temperature_2m_max,
          day: result.data.daily.time.map((x) => new Date(new Date(x).getTime() + (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4)),
          weatherCode: result.data.daily.weather_code,
          windSpeed: result.data.daily.wind_speed_10m,
          windDirection: result.data.daily.wind_direction_10m,
          windGusts: result.data.daily.wind_gusts_10m
        },
        dailyUnits: result.data.daily_units
      },
      userSettings
    });
  };
  useEffect(() => {
    var _a, _b;
    if (firstRender.current) {
      firstRender.current = false;
      const settings = new UserSettings(JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || "{}"));
      if (!validSettings(settings)) {
        navigate("/settings");
      }
      if (isValidCache()) {
        console.log("loading weather data from cache...");
        updateData(JSON.parse(localStorage.getItem(WEATHER_DATA_CACHE_KEY) || ""), settings);
      } else {
        console.log("loading weather data from api...");
        setFetching(true);
        axios({
          method: "Get",
          url: `${API_STRING}`,
          params: {
            //settings params
            timezone: "auto",
            latitude: (_a = settings.locations.find((x) => x.city === settings.selectedLocation)) == null ? void 0 : _a.latitude,
            longitude: (_b = settings.locations.find((x) => x.city === settings.selectedLocation)) == null ? void 0 : _b.longitude,
            temperature_unit: settings.temperatureUnit,
            wind_speed_unit: settings.speedUnit,
            precipitation_unit: settings.precipitationUnit,
            format: "json",
            timeformat: "iso8601",
            //return param variables
            current: weatherVariables,
            hourly: weatherVariables,
            daily: dailyWeatherVariables
          }
        }).then((result) => {
          updateData(result, settings);
          localStorage.setItem(WEATHER_DATA_CACHE_KEY, JSON.stringify(result));
          setFetching(false);
        }).catch((error2) => {
          console.log(error2);
          setError(error2.response.data.reason);
          setFetching(false);
        });
      }
    }
  });
  return /* @__PURE__ */ jsxs(Layout, { userSettings: data.userSettings, refresh, children: [
    fetching ? /* @__PURE__ */ jsx(LinearProgress, {}) : /* @__PURE__ */ jsx("div", { className: "fetching-placeholder" }),
    error && /* @__PURE__ */ jsx(Alert, { variant: "filled", severity: "error", action: /* @__PURE__ */ jsx(Icon, { onClick: () => setError(""), children: "close" }), children: error }),
    data.weatherData && /* @__PURE__ */ jsx(Weather, { weather: data.weatherData })
  ] });
}
function meta$2({}) {
  return [{
    title: "Weather"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Main, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function Settings() {
  useEffect(() => {
    setSettings(JSON.parse((localStorage == null ? void 0 : localStorage.getItem(SETTINGS_STORAGE_KEY)) || "{}"));
  }, []);
  const [location, setLocation] = useState({
    city: "",
    latitude: 0,
    longitude: 0
  });
  const [settings, setSettings] = useState(new UserSettings({
    locations: [{ city: "", latitude: 0, longitude: 0 }],
    selectedLocation: "",
    temperatureUnit: TemperatureUnit.Celsius,
    speedUnit: SpeedUnit.Kmh,
    precipitationUnit: PrecipitationUnit.Mm
  }));
  const handleTempChange = (event) => {
    const newSettings = new UserSettings({ ...settings });
    newSettings.temperatureUnit = event.target.value;
    setSettings(newSettings);
    updateSettings(newSettings);
  };
  const handleSpeedChange = (event) => {
    const newSettings = new UserSettings({ ...settings });
    newSettings.speedUnit = event.target.value;
    setSettings(newSettings);
    updateSettings(newSettings);
  };
  const handlePrecipChange = (event) => {
    const newSettings = new UserSettings({ ...settings });
    newSettings.precipitationUnit = event.target.value;
    setSettings(newSettings);
    updateSettings(newSettings);
  };
  const updateSettings = (updatedSettings) => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
    localStorage.removeItem(WEATHER_DATA_CACHE_KEY);
  };
  const addLocation = () => {
    const newSettings = new UserSettings({ ...settings });
    newSettings.locations.push(location);
    newSettings.selectedLocation = location.city;
    setSettings(newSettings);
    updateSettings(newSettings);
    setLocation({
      city: "",
      latitude: 0,
      longitude: 0
    });
  };
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((x) => {
      setLocation({ city: location.city, latitude: Number(x.coords.latitude.toFixed(4)), longitude: Number(x.coords.longitude.toFixed(4)) });
    });
  };
  return /* @__PURE__ */ jsx(Layout, { userSettings: settings, children: /* @__PURE__ */ jsxs("div", { className: "settings", children: [
    /* @__PURE__ */ jsx("div", { className: "settings-title", children: "Settings" }),
    /* @__PURE__ */ jsx("div", { children: "Units" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-[10px] p-[10px]", children: [
      /* @__PURE__ */ jsx("span", { children: "Temperature" }),
      /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(
        Select,
        {
          id: "temp-select",
          value: settings.temperatureUnit,
          style: { width: "150px" },
          onChange: handleTempChange,
          children: [
            /* @__PURE__ */ jsx(MenuItem, { value: TemperatureUnit.Fahrenheit, children: "Fahrenheit" }),
            /* @__PURE__ */ jsx(MenuItem, { value: TemperatureUnit.Celsius, children: "Celsius" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-[10px] p-[10px]", children: [
      /* @__PURE__ */ jsx("span", { children: "Speed" }),
      /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(
        Select,
        {
          id: "speed-select",
          value: settings.speedUnit,
          style: { width: "100px" },
          onChange: handleSpeedChange,
          children: [
            /* @__PURE__ */ jsx(MenuItem, { value: SpeedUnit.Mph, children: "Mph" }),
            /* @__PURE__ */ jsx(MenuItem, { value: SpeedUnit.Kmh, children: "Kmh" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-[10px] p-[10px]", children: [
      /* @__PURE__ */ jsx("span", { children: "Precipitation" }),
      /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(
        Select,
        {
          id: "prec-select",
          value: settings.precipitationUnit,
          style: { width: "100px" },
          onChange: handlePrecipChange,
          children: [
            /* @__PURE__ */ jsx(MenuItem, { value: PrecipitationUnit.Inch, children: "Inch" }),
            /* @__PURE__ */ jsx(MenuItem, { value: PrecipitationUnit.Mm, children: "mm" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pt-[20px]", children: "Location" }),
    /* @__PURE__ */ jsx(TextField, { value: location.city, onChange: (el) => setLocation({ ...location, city: el.target.value }), label: "City", variant: "outlined", style: { width: "100%", padding: "5px" } }),
    /* @__PURE__ */ jsx(TextField, { value: location.latitude, onChange: (el) => setLocation({ ...location, latitude: Number(el.target.value) }), label: "Latitude", variant: "outlined", style: { width: "50%", padding: "5px" } }),
    /* @__PURE__ */ jsx(TextField, { value: location.longitude, onChange: (el) => setLocation({ ...location, longitude: Number(el.target.value) }), label: "Longitude", variant: "outlined", style: { width: "50%", padding: "5px" } }),
    /* @__PURE__ */ jsx(Button, { onClick: addLocation, disabled: !location.city || !location.latitude || !location.longitude, variant: "contained", style: { margin: "5px" }, children: "Add Location" }),
    /* @__PURE__ */ jsx(IconButton, { onClick: getLocation, children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined", children: "my_location" }) })
  ] }) });
}
function meta$1({}) {
  return [{
    title: "Settings"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const setting = withComponentProps(function Setting() {
  return /* @__PURE__ */ jsx(Settings, {});
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: setting,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function RadarViewer() {
  let [rerender, setRerender] = useState(0);
  const [settings, setSettings] = useState(new UserSettings({
    locations: [{ city: "", latitude: 0, longitude: 0 }],
    selectedLocation: "",
    temperatureUnit: TemperatureUnit.Celsius,
    speedUnit: SpeedUnit.Kmh,
    precipitationUnit: PrecipitationUnit.Mm
  }));
  const getLocation = () => {
    return settings.locations.find((x) => x.city === settings.selectedLocation) || {};
  };
  const refresh = () => {
    setRerender(rerender += 1);
  };
  useEffect(() => {
    setSettings(JSON.parse((localStorage == null ? void 0 : localStorage.getItem(SETTINGS_STORAGE_KEY)) || "{}"));
  }, [rerender]);
  return /* @__PURE__ */ jsx(Layout, { userSettings: settings, refresh, children: /* @__PURE__ */ jsx("div", { className: "w-[100%] h-[100%]", children: /* @__PURE__ */ jsx("iframe", { loading: "lazy", style: { border: "none", width: "100%", height: "100%" }, src: `https://embed.windy.com/embed2.html?lat=${getLocation().latitude}&lon=${getLocation().longitude}&detailLat=${getLocation().latitude}&detailLon=${getLocation().longitude}&zoom=10&level=surface&overlay=wind&product=ecmwf&calendar=new&type=map&location=coordinates&metricWind=default&metricTemp=default&radarRange=-1` }) }) });
}
function meta({}) {
  return [{
    title: "Radar"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const radar = withComponentProps(function Radar() {
  return /* @__PURE__ */ jsx(RadarViewer, {});
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: radar,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C07sYFvc.js", "imports": ["/assets/chunk-W3FMU5Y5-D-frByQU.js", "/assets/index-BWkPs08E.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-DmFw2Rb-.js", "imports": ["/assets/chunk-W3FMU5Y5-D-frByQU.js", "/assets/index-BWkPs08E.js", "/assets/with-props-DLKdaGB0.js"], "css": ["/assets/root-Cn63KH70.css"] }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-DbGSJ1Si.js", "imports": ["/assets/with-props-DLKdaGB0.js", "/assets/chunk-W3FMU5Y5-D-frByQU.js", "/assets/layout-suDodgG5.js", "/assets/Select-D_I5NsKb.js", "/assets/index-BWkPs08E.js"], "css": ["/assets/home-C34JCUAz.css", "/assets/layout-Dium5HUv.css"] }, "routes/setting": { "id": "routes/setting", "parentId": "root", "path": "settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/setting-CVrwZcHV.js", "imports": ["/assets/with-props-DLKdaGB0.js", "/assets/chunk-W3FMU5Y5-D-frByQU.js", "/assets/layout-suDodgG5.js", "/assets/Select-D_I5NsKb.js", "/assets/index-BWkPs08E.js"], "css": ["/assets/setting-juXwpgwG.css", "/assets/layout-Dium5HUv.css"] }, "routes/radar": { "id": "routes/radar", "parentId": "root", "path": "radar", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/radar-CJ-KOKBC.js", "imports": ["/assets/with-props-DLKdaGB0.js", "/assets/chunk-W3FMU5Y5-D-frByQU.js", "/assets/layout-suDodgG5.js", "/assets/index-BWkPs08E.js"], "css": ["/assets/layout-Dium5HUv.css"] } }, "url": "/assets/manifest-d2f1bf09.js", "version": "d2f1bf09" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/setting": {
    id: "routes/setting",
    parentId: "root",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/radar": {
    id: "routes/radar",
    parentId: "root",
    path: "radar",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
};
