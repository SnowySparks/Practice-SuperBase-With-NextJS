"use client";

import { Spinner } from "@material-tailwind/react";
import MovieCard from "./movie-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearch } from "utils/store/searchText";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { searchMovies } from "actions/movieActions";
import { pages } from "next/dist/build/templates/app-page";

export default function MovieCardList() {
  const search = useSearch((state) => state.searchText);

  // Intersection Observer
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 1, // 처음 딱 실할 때 pageParam 초기값
      queryKey: ["movies", search],
      queryFn: ({ pageParam }) =>
        searchMovies({
          search,
          page: pageParam,
          pageSize: 12,
        }),
      getNextPageParam: (lastPage) => {
        // pageParma에 들어가는 다음 값을 리턴해주는 역할
        // 만약에 falsy가 리턴되면 더이상 데이터를 가져오지 않음 -> hasNextPage가 false가 됨
        return lastPage.page ? lastPage.page + 1 : null;
      },
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      console.log("fetching next page");
      fetchNextPage();
    } else {
      if (!hasNextPage) {
        console.log("no more pages");
      } else {
        console.log("not in view");
      }
    }
  }, [inView, hasNextPage]);

  return (
    <div className="relative grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
      {(isFetching || isFetchingNextPage) && (
        <Spinner className="h-10 w-10 z-50 absolute top-10 right-10" />
      )}
      {data?.pages && (
        <>
          {data?.pages
            ?.map((page) => page.data)
            .flat()
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          <div ref={ref}></div>
        </>
      )}
    </div>
  );
}
