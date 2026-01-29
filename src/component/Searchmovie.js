import { useSelector } from "react-redux";
import { movie_poster_url, options } from "../utils/constant";
import logo2 from "../utils/images/logo3.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Searchedmoviecard from "./Searchmoviecard";
import { Api_Key } from "../utils/api";

// const API_KEY = "AIzaSyDzJ5yvoltDthxUoEmfj-GTa6CPOrdLGBo";

const Searchmovie = () => {
  const [searchText, setSearchText] = useState("");
  const [movieDetails, setMovieDetails] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const name = useSelector((state) => state?.user?.name);

  const homeButtonHandler = () => {
    navigate("/b");
  };

  // Redirect to home if the user name is undefined
  if (!name) {
    navigate("/");
  }

  // Load movie details from local storage on mount
  useEffect(() => {
    const storedMovies = localStorage.getItem("movieDetails");
    if (storedMovies) {
      setMovieDetails(JSON.parse(storedMovies));
      setFlag(true); // Set flag to true since we have movie details
    }
  }, []);

  const searchButtonHandler = async () => {
    const genAI = new GoogleGenerativeAI(Api_Key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `.Query: ${searchText} just give me name of movie in a single line separated by comma by analysing this query just give in simple text form without any special character or inverted comma just a simple text in single line separated by comma`;
    try {
      const result = await model.generateContent(prompt);
      const movies = result?.response?.candidates[0]?.content.parts[0].text;
      const movieArray = movies
        ? movies.split(",").map((movie) => movie.trim()).slice(0, 50)
        : []; // Limit to 50 movies
      console.log(movieArray);

      // Collect movie ID fetch requests, taking only the first result
      const movieIdFetchPromises = movieArray.map(async (movie) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${Api_Key}&query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
          options
        );

        const result2 = await response.json();
        console.log(result2);

        // Take only the ID of the first result, if available
        const movieId = result2.results.length > 0 ? result2.results[0].id : null;
        if (movieId) {
          console.log("Movie ID:", movieId); // Log the movie ID
        }
        return movieId;
      });

      // Resolve all movie ID fetch requests and filter out null values
      const collectedMovieIds = await Promise.all(movieIdFetchPromises);
      const validMovieIds = collectedMovieIds.filter((id) => id !== null); // Filter out null IDs
      setMovieDetails([]); // Clear previous details

      // Fetch details for each collected movie ID, limited to 20
      const movieDetailsFetchPromises = validMovieIds.map(async (id) => {
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${Api_Key}&language=en-US`
        );

        return await detailsResponse.json();
      });

      // Resolve all detail fetch requests and update the state
      const detailsResults = await Promise.all(movieDetailsFetchPromises);
      setMovieDetails(detailsResults.slice(0, 20)); // Limit total movie details to 20

      // Store movie details in local storage
      localStorage.setItem("movieDetails", JSON.stringify(detailsResults.slice(0, 20)));
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
    setFlag(true);
  };

  return (
    <div className="relative w-screen h-screen text-white">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={movie_poster_url}
          alt="Movie Background"
          className="shadow-lg shadow-black rounded-lg w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="flex justify-between">
          <div className="w-full flex justify-between items-center p-4">
            <img className="w-24 md:w-24 ml-4" src={logo2} alt="Logo" />
            <button
              onClick={homeButtonHandler}
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mb-2 lg:mr-12 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Home
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-[2%] p-5">
          {name && (
            <h1 className="font-extrabold text-6xl text-center my-6 font-sans">
              Hey {name}
            </h1>
          )}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-center w-11/12 md:w-3/5 lg:w-2/5 mx-auto px-4 md:px-10 font-bold">
            I am your Movie Mentor, here to recommend great movies for you!
          </h2>
          <div className="my-8">
            <h4 className="text-center text-lg font-bold m-4">
              Feel free to ask me your Movie suggestion
            </h4>
            <div className="flex flex-col md:flex-row justify-center items-center my-8 space-y-4 md:space-y-0 md:space-x-4">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Enter your suggestion"
                className="h-12 text-base md:text-lg lg:text-xl text-black w-10/12 md:w-1/2 lg:w-1/3 bg-slate-50 bg-opacity-80 border-red-500 rounded-sm px-4"
                type="text"
              />
              <button
                onClick={searchButtonHandler}
                type="button"
                className="h-12 w-6/12 md:w-[15%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-sm text-base md:text-lg px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-black flex flex-wrap justify-around ">
          {movieDetails.length > 0 ? (
            movieDetails.map((details, index) => (
              <Searchedmoviecard key={index} data={details} />
            ))
          ) : (
            flag === true ? (
              <div className="text-center text-lg font-bold mt-4">
                No matches found for your prompt. Please rewrite the prompt.
              </div>
            ) : <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchmovie;
