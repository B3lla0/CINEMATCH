import { useEffect, useState } from "react";
import { getRandomMovies } from "../../services/tmdb";
import type { Movie } from "../../services/tmdb";
import MovieCard from "../../components/MovieCard/MovieCard";

interface Props {
  onComplete: (ratings: Record<number, number>, movies: Movie[]) => void;
}

function RatingPage({ onComplete }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<number, number>>({});

  useEffect(() => {
    getRandomMovies()
      .then((data) => setMovies(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRate = (movieId: number, score: number) => {
    setRatings((prev) => ({ ...prev, [movieId]: score }));
  };

  if (isLoading) {
    return <div>영화 불러오는 중 . . .</div>;
  }

  return (
    <div>
      <p>시청하셨던 영화에 별점을 매겨주세요.</p>
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onRate={handleRate}
            rating={ratings[movie.id] ?? 0}
          />
        ))}
      </div>
      <button onClick={() => onComplete(ratings, movies)}>결과 보기</button>
    </div>
  );
}

export default RatingPage;
