import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Backup from "../utils/images/logo2.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Api_Key } from "../utils/api";


export const MovieDetail = () => {
    const params = useParams();
    const [movie, setMovie] = useState({});

    const image = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : Backup;

    useEffect(() => {
        async function fetchMovie() {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${Api_Key}&language=en-US`
            );
            const json = await response.json();
            // console.log(json);
            setMovie(json);
        }
        fetchMovie();
    }, [params.movieId]);

    return (
       <div>
               <Navbar/>
              <main className="bg-black text-white ">
              
               <section className="flex flex-col md:flex-row justify-center items-center py-5 mt-9">
                <div className="max-w-sm mb-4  ">
                    <img className="rounded-2xl mt-[5%]" src={image} alt={movie.title} />
                </div>
                <div className="max-w-2xl text-gray-700 text-lg dark:text-white text-center md:text-left  p-7 mx-9">
                    <h1 className="text-4xl font-bold my-3">{movie.title}</h1>
                    <p className="my-4">{movie.overview}</p>
                    {movie.genres ? (
                        <p className="my-7 flex flex-wrap justify-center md:justify-start gap-2">
                            {movie.genres.map((genre) => (
                                <span
                                    className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2"
                                    key={genre.id}
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </p>
                    ) : (
                        ""
                    )}

                    <div className="flex items-center justify-center md:justify-start">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Rating star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <p className="ml-2 text-gray-900 dark:text-white">
                            {`${movie.vote_average}/10`}
                        </p>
                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <span className="text-gray-900 dark:text-white">
                            {movie.vote_count} reviews
                        </span>
                    </div>

                    <p className="my-4">
                        <span className="mr-2 font-bold">Runtime:</span>
                        <span>{movie.runtime} min.</span>
                    </p>

                    <p className="my-4">
                        <span className="mr-2 font-bold">Budget:</span>
                        <span>
                            $ {(movie.budget / 1000000).toFixed(2)} Million USD
                        </span>
                    </p>

                    <p className="my-4">
                        <span className="mr-2 font-bold">Revenue:</span>
                        <span>
                            $ {(movie.revenue / 1000000).toFixed(2)} Million USD
                        </span>
                    </p>

                    <p className="my-4">
                        <span className="mr-2 font-bold">Release Date:</span>
                        <span>{movie.release_date}</span>
                    </p>

                    <p className="my-4">
                        <a
                            href={`https://www.imdb.com/title/${movie.imdb_id}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                View on IMDB
                            </button>
                        </a>
                    </p>
                </div>
            </section>
        </main>
        <Footer/>
       </div>
        
    );
};

export default MovieDetail;
