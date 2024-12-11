import { getMovie } from "actions/movieActions";
import UI from "./ui";
import { Metadata } from "next";

interface MovieDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(parseInt(id));

  return {
    title: movie.title,
    description: movie.overview,
    openGraph: {
      images: [movie.image_url],
      title: movie.title,
      description: movie.overview,
    },
  };
}

export default async function MovieDetail({ params }: MovieDetailProps) {
  const { id } = await params;
  const movie = await getMovie(parseInt(id));

  return (
    <main className="py-16 flex items-center bg-blue-50 w-full absolute top-0 bottom-0 left-0 right-0">
      {movie ? <UI movie={movie} /> : <div>Movie not found</div>}
    </main>
  );
}
