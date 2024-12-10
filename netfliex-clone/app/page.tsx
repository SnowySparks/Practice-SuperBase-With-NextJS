import UI from "components/UI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMDBFLIX",
  description: "영화 목록 사이트 (연습)",
  openGraph: {
    title: "TMDBFLIX",
    description: "영화 목록 사이트 (연습)",
    images: ["/images/tmdbflix_logo.png"],
  },
};

export default function Home() {
  return <UI />;
}
