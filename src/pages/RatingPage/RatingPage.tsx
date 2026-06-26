import { useEffect, useState } from "react";
import { getRandomMovies } from "../../services/tmdb";
import type { Movie } from "../../services/tmdb";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./RatingPage.module.css";

interface Props {
  onComplete: (ratings: Record<number, number>, movies: Movie[]) => void;
}

function RatingPage({ onComplete }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<number, number>>({});

  const ratedCount = Object.keys(ratings).length;
  const remaining = Math.max(0, 5 - ratedCount);

  useEffect(() => {
    getRandomMovies()
      .then((data) => setMovies(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRate = (movieId: number, score: number) => {
    setRatings((prev) => ({ ...prev, [movieId]: score }));
  };

  if (isLoading) {
    return <div className={styles.loading}>🎬 영화 불러오는 중 . . .</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>🎬</span>
        <h1>취향을 알려주세요.</h1>
        <p>
          알고 있는 영화에 별점을 매겨주세요.
          <br />
          별점을 기반으로 맞춤 영화를 추천해 드립니다.
        </p>
        <div className={styles.resultBtnCon}>
          <button
            className={`${styles.resultBtn} ${
              ratedCount >= 5 ? styles.resultBtnActive : ""
            }`}
            onClick={() => {
              if (ratedCount < 5) return;
              onComplete(ratings, movies);
            }}
            disabled={ratedCount < 5}
          >
            {ratedCount >= 5
              ? "결과 보기 →"
              : `${remaining}개 더 평가하면 결과를 볼 수 있어요.`}
          </button>
        </div>
      </div>
      <div className={styles.movieContainer}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onRate={handleRate}
            rating={ratings[movie.id] ?? 0}
          />
        ))}
      </div>
    </div>
  );
}

export default RatingPage;
