import { useState } from "react";
import "./App.css";
import RatingPage from "./pages/RatingPage/RatingPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import type { Movie } from "./services/tmdb";

function App() {
  const [page, setPage] = useState<"rating" | "result">("rating");
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);

  const handleComplete = (ratings: Record<number, number>, movies: Movie[]) => {
    setRatings(ratings);
    setRatedMovies(movies);
    setPage("result");
  };

  return (
    <>
      {page === "rating" ? (
        <RatingPage onComplete={handleComplete} />
      ) : (
        <ResultPage
          ratings={ratings}
          ratedMovies={ratedMovies}
          onBack={() => setPage("rating")}
        />
      )}
    </>
  );
}

export default App;
