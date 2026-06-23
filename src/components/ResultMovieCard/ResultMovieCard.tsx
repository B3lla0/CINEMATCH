import type { Movie } from "../../services/tmdb";
import { getPosterUrl } from "../../services/tmdb";

interface Props {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

function ResultMovieCard({ movie, onClick }: Props) {
  return (
    <div onClick={() => onClick(movie)}>
      <img src={getPosterUrl(movie.poster_path) ?? ""} alt={movie.title} />
      <p>{movie.title}</p>
    </div>
  );
}

export default ResultMovieCard;
