import { useEffect, useState } from "react"; // Import useEffect instead of useState
import { options } from "../utils/constant";
import Moviecard from "./Moviecard";
import { Api_Key } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Upcoming = () => {
  const [data, setData] = useState([]);
  const navigate=useNavigate();
  const upcomingData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_Key}`,
      options
    );
    const result = await response.json();
    setData(result?.results);
  };

  useEffect(() => {
    upcomingData();
  }, []);

  return (
    <div className="p-4 md:p-8 lg:p-16 -mt-[7%] pb-[8%] relative z-30"> {/* Adjust padding for responsiveness */}
      <h1 className="text-violet-500 font-bold font-sans text-xl md:text-2xl -mb-8 ml-2">Upcoming</h1>
      <div className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide">
        {data.length > 0 &&
          data.map((movie) => (
            <Moviecard 
              key={movie.id} 
              poster_id={movie.poster_path} 
              name={movie.title} 
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="w-32 md:w-40 lg:w-48" // Responsive width for Moviecard
            />
          ))}
      </div>
    </div>
  );
};

export default Upcoming;
