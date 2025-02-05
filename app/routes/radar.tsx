import { RadarViewer } from "~/components/radar/radar-viewer";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Radar" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Radar() {
  return <RadarViewer />;
}
