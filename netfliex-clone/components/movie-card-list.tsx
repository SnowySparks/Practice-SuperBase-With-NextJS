"use client";

import { Spinner } from "@material-tailwind/react";
import MovieCard from "./movie-card";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "actions/movieActions";
import { useSearch } from "utils/store/searchText";

export default function MovieCardList() {
  const search = useSearch((state) => state.searchText);

  const getAllMoviesQuery = useQuery({
    queryKey: ["movie", search],
    queryFn: () => searchMovies(search),
  });

  return (
    <div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
      {getAllMoviesQuery.isPending && <Spinner />}
      {getAllMoviesQuery.data &&
        getAllMoviesQuery.data.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      {getAllMoviesQuery.isError && (
        <div>
          Something went wrong : {JSON.stringify(getAllMoviesQuery.error)}
        </div>
      )}
    </div>
  );
}
