import type { Movie, Genre } from "../../services/tmdb";
import { calcGenreScores } from "../../services/genreServices";
import { useState, useEffect } from "react";
import { getGenres, getMoviesByGenre } from "../../services/tmdb";
import ResultMovieCard from "../../components/ResultMovieCard/ResultMovieCard";
import styles from "./ResultPage.module.css";

interface GenreWithMovies {
  genreId: number;
  name: string;
  score: number;
  movies: Movie[];
}

interface Props {
  ratings: Record<number, number>;
  ratedMovies: Movie[];
  onBack: () => void;
}

function ResultPage({ ratings, ratedMovies, onBack }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreResults, setGenreResults] = useState<GenreWithMovies[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 장르 목록 가져오기
  useEffect(() => {
    getGenres().then((data) => setGenres(data));
  }, []);

  // 장르별 영화 가져오기
  useEffect(() => {
    if (genres.length === 0) return;

    async function fetchGenreMovies() {
      // 장르 점수 계산
      const genreScores = calcGenreScores(ratings, ratedMovies);
      const top5 = genreScores.slice(0, 5);

      // 장르별 영화 가져오기
      const promises = top5.map(async ({ genreId, score }) => {
        // 장르 id → 장르 이름 변환
        const foundGenre = genres.find((genre) => genre.id === genreId);
        const name = foundGenre ? foundGenre.name : "알 수 없음";
        const movies = await getMoviesByGenre(genreId);

        console.log("장르:", name, "장르 점수:", score);

        return { genreId, score, name, movies };
      });

      const results = await Promise.all(promises);
      setGenreResults(results);
      setIsLoading(false);
    }
    fetchGenreMovies();
  }, [genres, ratings, ratedMovies]);

  if (isLoading) {
    return <div>결과 분석 중...</div>;
  }

  return (
    <>
      <h1>선호하는 영화 장르는?</h1>
      <div className={styles.genreSection}>
        {genreResults.map(({ genreId, name, score, movies }) => (
          <div key={genreId}>
            <h2>
              {name} ({score.toFixed(1)}점)
            </h2>
            <div className={styles.movieList}>
              {movies.map((movie) => (
                <ResultMovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={(movie) => console.log("클릭:", movie.title)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={onBack}>다시하기</button>
    </>
  );
}

export default ResultPage;
