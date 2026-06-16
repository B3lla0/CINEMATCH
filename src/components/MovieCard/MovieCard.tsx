import type { Movie } from "../../services/tmdb";
import { getPosterUrl } from "../../services/tmdb";

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: props) {
  return (
    <div>
      <img src={getPosterUrl(movie.poster_path) ?? ""} alt={movie.title} />

      <div>별점</div>
    </div>
  );
}

export default MovieCard;
