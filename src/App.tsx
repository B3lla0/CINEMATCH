import { useState } from "react";
import "./App.css";
import RatingPage from "./pages/RatingPage/RatingPage";

function App() {
  const [page, setPage] = useState<"rating" | "result">("rating");

  return <>{page === "rating" ? <RatingPage /> : <div>result</div>}</>;
}

export default App;
