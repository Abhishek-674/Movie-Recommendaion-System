import React, { useEffect, useState } from "react";
import { options } from "../utils/constant";
import { Api_Key } from "../utils/api";

const Headervedio = (props) => {
  const [movieId, setMovieId] = useState();

  const fetchVideoData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${props?.movie_id}/videos?api_key=${Api_Key}`,
      options
    );
    const result = await response.json();
    // console.log(result);
    const trailer = result.results?.find((movie) => movie.type === "Trailer");
    setMovieId(trailer?.key);
  };

  useEffect(() => {
    fetchVideoData();
  }, [props.movie_id]);

  return (
    <div className="relative w-screen h-screen overflow-hidden z-10">
      {/* Video div taking 50% height on mobile and full height on larger screens */}
      <div className="absolute inset-x-0 top-0 h-1/2 md:h-full"> {/* Changed to h-1/2 for mobile */}
        <iframe
          className="absolute inset-0 w-full h-full object-cover"
          src={`https://www.youtube.com/embed/${movieId}?autoplay=1&mute=1&playsinline=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Updated gradient direction to bottom to top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex items-center justify-start p-4 md:p-8 -mt-14">
        <div className="w-full md:w-1/3 lg:w-2/5 space-y-4 md:space-y-6">
          <h1 className="text-lg text-white md:text-4xl lg:text-5xl font-bold">{props.title}</h1>
          <p className="text-xs text-slate-300 md:text-base lg:text-lg font-serif">{props.overview}</p>
          <h5 className="text-slate-400">Release Date: {props.date}</h5>
        </div>
      </div>
    </div>
  );
};

export default Headervedio;
