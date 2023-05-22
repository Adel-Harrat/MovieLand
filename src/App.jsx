import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./SearchIcon.svg";
import Movie from "./Movie";

const API_URL = "http://www.omdbapi.com?apikey=83024996";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Titanic");
  }, []);

  const onImg = () => {};

  return (
    <>
      <div className="app">
        <h1>MovieLand</h1>

        <div className="search">
          <input
            type="text"
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />

          <img
            src={SearchIcon}
            alt="search"
            onClick={() => {
              searchMovies(searchTerm);
            }}
          />
        </div>

        <div className="container">
          {movies?.length > 0 ? (
            movies?.map((movie) => <Movie key={movie.imdbID} movie={movie} />)
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
