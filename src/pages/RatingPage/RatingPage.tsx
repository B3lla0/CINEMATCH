import { useEffect, useState } from "react";
import { getRandomMovies } from "../../services/tmdb";
import type { Movie } from "../../services/tmdb";
import MovieCard from "../../components/MovieCard/MovieCard";

function RatingPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRandomMovies()
      .then((data) => setMovies(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRate = (movieId: number, score: number) => {
    console.log(`${movieId} :: ${score}점`);
  };

  if (isLoading) {
    return <div>영화 불러오는 중 . . .</div>;
  }

  return (
    <div>
      <p>시청하셨던 영화에 별점을 매겨주세요.</p>
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onRate={handleRate} />
        ))}
      </div>
      <button>결과 보기</button>
    </div>
  );
}

export default RatingPage;
