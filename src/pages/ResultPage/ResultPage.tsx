import type { Movie } from "../../services/tmdb";

interface Props {
  ratings: Record<number, number>;
  ratedMovies: Movie[];
  onBack: () => void;
}

function ResultPage({ ratings, ratedMovies, onBack }: Props) {
  console.log("ratings", ratings);
  console.log("ratedMovies", ratedMovies);

  return (
    <>
      <h1>선호하는 영화 장르는?</h1>
      <div>장르별 영화 목록</div>

      <button onClick={onBack}>다시하기</button>
    </>
  );
}

export default ResultPage;
