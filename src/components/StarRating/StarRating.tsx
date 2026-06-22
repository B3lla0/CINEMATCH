import { useState } from "react";
import styles from "./StarRating.module.css";

interface Props {
  movieId: number;
  onRate: (movieId: number, score: number) => void;
  rating: number;
}

function StarRating({ movieId, onRate, rating }: Props) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className={styles.star}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(movieId, star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={star <= (hovered || rating) ? styles.filled : ""}
        >
          {star <= (hovered || rating) ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}

export default StarRating;
