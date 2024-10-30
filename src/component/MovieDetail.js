import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Backup from "../utils/images/logo2.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Api_Key } from "../utils/api";
import { options } from "../utils/constant";

export const MovieDetail = () => {
    const params = useParams();
    const [movie, setMovie] = useState({});
    const [movieId, setMovieId] = useState();
    const image = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : Backup;

    useEffect(() => {
        async function fetchMovie() {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${Api_Key}&language=en-US`
            );
            const json = await response.json();
            setMovie(json);
        }
        fetchMovie();
    }, [params.movieId]);

    const fetchVideoData = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${params.movieId}/videos?api_key=${Api_Key}`,
            options
        );
        const result = await response.json();
        const trailer = result.results?.find((movie) => movie.type === "Trailer");
        setMovieId(trailer?.key);
    };

    useEffect(() => {
        fetchVideoData();
    }, [params.movie_id]);

    return (
        <div className="bg-black">
            <Navbar />
            
            {/* Video Section */}
            <div className="relative w-full h-[60vh] md:h-screen overflow-hidden z-10">
                <iframe
                    className="w-full h-full object-cover"
                    src={`https://www.youtube.com/embed/${movieId}?autoplay=1&mute=1&playsinline=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Main Content Section */}
            <main className="relative bg-black text-white mt-4 md:-mt-[2%] z-20 -mt-[8%]">
                <section className="flex flex-col md:flex-row items-center px-4 md:px-8 py-6">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <img className="rounded-2xl w-full max-w-xs mx-auto" src={image} alt={movie.title} />
                    </div>
                    <div className="w-full md:w-2/3 text-center md:text-left text-gray-700 dark:text-white mt-4 md:mt-0">
                        <h1 className="text-3xl md:text-4xl font-bold my-3">{movie.title}</h1>
                        <p className="my-4 text-sm md:text-base">{movie.overview}</p>
                        
                        {movie.genres && (
                            <p className="my-4 flex flex-wrap justify-center md:justify-start gap-2 text-sm">
                                {movie.genres.map((genre) => (
                                    <span
                                        className="px-2 py-1 border border-gray-200 rounded dark:border-gray-600"
                                        key={genre.id}
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </p>
                        )}

                        <div className="flex items-center justify-center md:justify-start text-yellow-400 text-sm md:text-base mt-3">
                            <svg
                                aria-hidden="true"
                                className="w-4 h-4 md:w-5 md:h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Rating star</title>
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <p className="ml-2">{`${movie.vote_average}/10 (${movie.vote_count} reviews)`}</p>
                        </div>

                        <div className="text-sm md:text-base">
                            <p className="my-2"><strong>Runtime:</strong> {movie.runtime} min</p>
                            <p className="my-2"><strong>Budget:</strong> $ {(movie.budget / 1000000).toFixed(2)} Million USD</p>
                            <p className="my-2"><strong>Revenue:</strong> $ {(movie.revenue / 1000000).toFixed(2)} Million USD</p>
                            <p className="my-2"><strong>Release Date:</strong> {movie.release_date}</p>
                        </div>

                        <div className="mt-4">
                            <a
                                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
                                    View on IMDB
                                </button>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default MovieDetail;
