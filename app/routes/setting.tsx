import { Settings } from "~/components/settings/settings";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Setting() {
  return <Settings />;
}
