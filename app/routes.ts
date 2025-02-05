import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("settings", "routes/setting.tsx"),
    route("radar", "routes/radar.tsx")
] satisfies RouteConfig;
