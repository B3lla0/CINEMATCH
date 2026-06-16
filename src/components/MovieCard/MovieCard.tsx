import type { Movie } from "../../services/tmdb";
import { getPosterUrl } from "../../services/tmdb";
import StarRating from "../\bStarRating/StarRating";

interface Props {
  movie: Movie;
  onRate: (movieId: number, score: number) => void;
}

function MovieCard({ movie, onRate }: Props) {
  return (
    <div>
      <img src={getPosterUrl(movie.poster_path) ?? ""} alt={movie.title} />
      <p>{movie.title}</p>

      <StarRating movieId={movie.id} onRate={onRate} />
    </div>
  );
}

export default MovieCard;
