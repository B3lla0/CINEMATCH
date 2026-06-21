import type { Movie } from "./tmdb";

interface GenreScore {
  genreId: number;
  score: number;
}

export function calcGenreScores(
  ratings: Record<number, number>,
  ratedMovies: Movie[]
): GenreScore[] {
  const genreScoreMap: Record<number, { total: number; count: number }> = {};

  ratedMovies.forEach((movie) => {
    const rating = ratings[movie.id];
    if (!rating) return;

    movie.genre_ids.forEach((genreId) => {
      if (!genreScoreMap[genreId]) {
        genreScoreMap[genreId] = { total: 0, count: 0 };
      }
      genreScoreMap[genreId].total += rating; // 별점 누적
      genreScoreMap[genreId].count += 1; // 장르 횟수 누적
    });
  });

  // 장르별 평균 점수 계산 후 높은 순 정렬
  // 객체를 배열로 변환해서 계산
  return Object.entries(genreScoreMap)
    .map(([genreId, { total, count }]) => ({
      genreId: Number(genreId),
      score: total / count,
    }))
    .sort((a, b) => b.score - a.score);
}
