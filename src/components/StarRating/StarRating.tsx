interface Props {
  movieId: number;
  onRate: (movieId: number, score: number) => void;
  rating: number;
}

function StarRating({ movieId, onRate, rating }: Props) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => onRate(movieId, star)}>
          {star <= rating ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}

export default StarRating;
