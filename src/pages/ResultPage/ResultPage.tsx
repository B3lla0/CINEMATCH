import type { Movie, Genre } from "../../services/tmdb";
import { calcGenreScores } from "../../services/genreServices";
import { useState, useEffect } from "react";
import { getGenres } from "../../services/tmdb";

interface Props {
  ratings: Record<number, number>;
  ratedMovies: Movie[];
  onBack: () => void;
}

function ResultPage({ ratings, ratedMovies, onBack }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    getGenres().then((data) => setGenres(data));
  }, []);

  // 장르 점수 계산
  const genreScores = calcGenreScores(ratings, ratedMovies);

  // 장르 id → 장르 이름 변환
  const genreNames = genreScores.map(({ genreId, score }) => {
    const foundGenre = genres.find((genre) => genre.id === genreId);
    const name = foundGenre ? foundGenre.name : "알 수 없음";

    return { genreId, score, name };
  });

  console.log("장르 점수:", genreNames);

  return (
    <>
      <h1>선호하는 영화 장르는?</h1>
      <div>장르별 영화 목록</div>

      <button onClick={onBack}>다시하기</button>
    </>
  );
}

export default ResultPage;
