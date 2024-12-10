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
        if (lastPage.hasNext) {
          return lastPage.page + 1;
        }
        return null;
      },
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

  // Intersection Observer에 감지가 되고 ,다음 페이지가 존재하며, 이전 페이지를 가져오는 중이 아니며, 데이터를 가져오는 중이 아닐 때
  // 다음 페이지를 가져옴
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      console.log("fetching next page");
      fetchNextPage();
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
            .flat() // 2차원 배열을 1차원 배열로 만들어줌
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          <div className="mb-14" ref={ref}></div>
        </>
      )}
    </div>
  );
}
