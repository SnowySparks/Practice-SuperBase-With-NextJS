import UI from "components/UI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMDBFLIX",
  description: "Netflix clone using TMDB API",
};

export default function Home() {
  return <UI />;
}
