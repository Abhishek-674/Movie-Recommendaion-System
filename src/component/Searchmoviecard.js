import { useNavigate } from "react-router-dom";

const SearchedMovieCard = (props) => {
    const navigate=useNavigate();
    // console.log("props", props.data);

    // Check if poster_path exists
    if (!props.data.poster_path) {
        return null; // Do not render the card if poster_path is missing
    }

    const truncateOverview = (text, wordLimit) => {
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };
    const card_click_handler = (movieId) => {
        // console.log("movie card cleck")
        navigate(`/movie/${movieId}`);
      };

    return (
        <div  onClick={() => card_click_handler(props?.data?.id)} className="w-48 h-[300px] sm:w-52 sm:h-[320px] rounded-lg shadow-lg dark:bg-slate-800 overflow-hidden m-4 relative transition-transform duration-300 hover:scale-110">
            <a href="#">
                <img 
                    className="w-full h-full object-cover rounded-lg" 
                    src={`https://image.tmdb.org/t/p/original/${props.data.poster_path}`} 
                    alt="Movie Thumbnail" 
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black bg-opacity-80 flex flex-col items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
                    <h1 className="text-md font-bold mb-1 text-center">{props.data.title}</h1>

                    {/* Rating and Popularity */}
                    <div className="flex items-center space-x-1 mb-2">
                        <span className="text-yellow-400 font-semibold">{props.data.vote_average || "N/A"}</span>
                        <span className="text-xs text-gray-300">| Popularity: {props.data.popularity.toFixed(0) || "N/A"}</span>
                    </div>

                    {/* Genre (if available) */}
                    {/* {props.data.genre_ids && (
                        <p className="text-xs text-gray-300 mb-1">
                            {props.data.genre_ids.slice(0, 2).map(id => genreMap[id]).join(", ")}
                        </p>
                    )} */}

                    <p className="text-xs text-center mb-2">{truncateOverview(props.data.overview, 15)}</p>
                    
                    {/* Styled Release Date */}
                    <p className="text-xs font-semibold text-gray-400 mb-2">Release Date: {props.data.release_date}</p>

                    <a 
                        href="#" 
                        className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Read more
                        <svg 
                            className="w-3 h-3 ml-2 rtl:rotate-180" 
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 14 10"
                        >
                            <path 
                                stroke="currentColor" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                </div>
            </a>
        </div>
    );
};

export default SearchedMovieCard;
