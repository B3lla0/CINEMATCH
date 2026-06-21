import type { Movie } from "../../services/tmdb";
import { getPosterUrl } from "../../services/tmdb";
import StarRating from "../StarRating/StarRating";
import styles from "./MovieCard.module.css";

interface Props {
  movie: Movie;
  onRate: (movieId: number, score: number) => void;
  rating: number;
}

function MovieCard({ movie, onRate, rating }: Props) {
  return (
    <div className={styles.movieCard}>
      <img src={getPosterUrl(movie.poster_path) ?? ""} alt={movie.title} />
      <div className={styles.movieInfo}>
        <p>{movie.title}</p>
        <StarRating movieId={movie.id} onRate={onRate} rating={rating} />
      </div>
    </div>
  );
}

export default MovieCard;
