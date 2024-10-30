import { useNavigate } from "react-router-dom";

const SearchedMovieCard = (props) => {
    const navigate = useNavigate();

    if (!props.data.poster_path) {
        return null;
    }

    const truncateOverview = (text, wordLimit) => {
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };

    const card_click_handler = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div
            
            onClick={() => card_click_handler(props.data.id)}
            className=" cursor-pointer w-[155px] h-52 sm:w-52 sm:h-[320px] md:w-1/4 lg:w-48 rounded-lg shadow-xl dark:bg-black overflow-hidden m-4 relative transition-transform duration-300 hover:scale-105 flex flex-col"
        >
            {/* Image occupying 80% of the height */}
            <img 
                className="w-full h-4/5 object-cover rounded-lg transition duration-500 ease-in-out transform hover:scale-110 " 
                src={`https://image.tmdb.org/t/p/original/${props.data.poster_path}`} 
                alt={props.data.title} 
            />
            
            {/* Title occupying 20% of the height */}
            <div className="w-full h-1/5 flex items-center justify-center p-2">
                <h1 className="text-sm font-bold font-serif text-center">{props.data.title}</h1>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black bg-opacity-80 flex flex-col items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-yellow-400 font-semibold">{props.data.vote_average || "N/A"}</span>
                    <span className="text-xs text-gray-300">| Popularity: {props.data.popularity.toFixed(0) || "N/A"}</span>
                </div>
                <p className="text-xs text-center mb-2">{truncateOverview(props.data.overview, 15)}</p>
                <p className="text-xs font-semibold text-gray-400 mb-2">Release Date: {props.data.release_date}</p>
                <a 
                    href="#"
                    className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    Read more
                    <svg 
                        className="w-3 h-3 ml-1" 
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
        </div>
    );
};

export default SearchedMovieCard;
