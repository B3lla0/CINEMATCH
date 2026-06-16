interface Props {
  movieId: number;
  onRate: (movieId: number, score: number) => void;
}

function StarRating({ movieId, onRate }: Props) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => onRate(movieId, star)}>
          ⭐
        </button>
      ))}
    </div>
  );
}

export default StarRating;
