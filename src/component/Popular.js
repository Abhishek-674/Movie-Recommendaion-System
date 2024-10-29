import { useEffect, useState } from "react"; // Use useEffect for fetching data
import { options } from "../utils/constant";
import Moviecard from "./Moviecard";
import { Api_Key } from "../utils/api";

const Popular = () => {
  const [data, setData] = useState([]); // Initialize with an empty array

  const popularData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Api_Key}`,
      options
    );
    const result = await response.json();
    setData(result?.results);
  };

  useEffect(() => {
    popularData(); // Call the function to fetch data on mount
  }, []);

  return (
    <div className="p-4 md:p-8 lg:p-16 -mt-[7%] pb-[12%] relative z-30"> {/* Responsive padding */}
      <h1 className="text-white font-bold font-sans text-xl md:text-2xl -mb-8 ml-2">Popular Movies</h1>
      <div className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide">
        {data.length > 0 && // Check if data is available
          data.map((movie) => (
            <Moviecard 
              key={movie.id} 
              poster_id={movie.poster_path} 
              name={movie.title} 
              className="w-32 md:w-40 lg:w-48" // Responsive width for Moviecard
            />
          ))}
      </div>
    </div>
  );
};

export default Popular;
