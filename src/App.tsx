import { useState } from "react";
import "./App.css";
import RatingPage from "./pages/RatingPage/RatingPage";
import ResultPage from "./pages/ResultPage/ResultPage";

function App() {
  const [page, setPage] = useState<"rating" | "result">("rating");

  return (
    <>
      {page === "rating" ? (
        <RatingPage onComplete={() => setPage("result")} />
      ) : (
        <ResultPage onBack={() => setPage("rating")} />
      )}
    </>
  );
}

export default App;
