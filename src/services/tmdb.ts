import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  genre_ids: number[];
  vote_average: number;
  release_date: string;
}

export interface Genre {
  id: number;
  name: string;
}

const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
  params: {
    language: "ko-KR",
  },
});

// 랜덤 영화 10개 가져오기
export async function getRandomMovies(): Promise<Movie[]> {
  const randomPage = Math.floor(Math.random() * 20) + 1;

  const response = await tmdb.get<{ results: Movie[] }>("/discover/movie", {
    params: {
      sort_by: "popularity.desc",
      page: randomPage,
    },
  });

  const movies = response.data.results;
  return movies.sort(() => Math.random() - 0.5).slice(0, 10);
}

// 장르 목록 가져오기
export async function getGenres(): Promise<Genre[]> {
  const response = await tmdb.get<{ genres: Genre[] }>("/genre/movie/list");
  return response.data.genres;
}

// 특정 장르의 인기 영화 가져오기
export async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  const response = await tmdb.get<{ results: Movie[] }>("/discover/movie", {
    params: {
      with_genres: genreId,
      sort_by: "papularity.desc",
    },
  });
  return response.data.results.slice(0, 10);
}

// 영화 포스터 이미지 가져오기
export function getPosterUrl(posterPath: string | null): string | null {
  if (!posterPath) return null;
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}
