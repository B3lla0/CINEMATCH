import type { Movie } from "../../services/tmdb";
import { getPosterUrl } from "../../services/tmdb";
import StarRating from "../StarRating/StarRating";

interface Props {
  movie: Movie;
  onRate: (movieId: number, score: number) => void;
  rating: number;
}

function MovieCard({ movie, onRate, rating }: Props) {
  return (
    <div>
      <img src={getPosterUrl(movie.poster_path) ?? ""} alt={movie.title} />
      <p>{movie.title}</p>

      <StarRating movieId={movie.id} onRate={onRate} rating={rating} />
    </div>
  );
}

export default MovieCard;
