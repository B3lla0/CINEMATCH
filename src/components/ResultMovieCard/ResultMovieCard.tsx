import type { Movie } from "../../services/tmdb";
import { getPosterUrl } from "../../services/tmdb";
import styles from "./ResultMovieCard.module.css";

interface Props {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

function ResultMovieCard({ movie, onClick }: Props) {
  return (
    <div className={styles.movieCard} onClick={() => onClick(movie)}>
      <img src={getPosterUrl(movie.poster_path) ?? ""} alt={movie.title} />
      <p>{movie.title}</p>
    </div>
  );
}

export default ResultMovieCard;
