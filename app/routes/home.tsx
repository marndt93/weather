import { Main } from "~/components/main/main";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Weather" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Main />;
}
