import React, { useEffect, useState } from "react";
import { options } from "../utils/constant";

const Headervedio = (props) => {
  const [movieId, setMovieId] = useState();

  const fetchVideoData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${props?.movie_id}/videos?api_key=6dc74219d2cf71796144e04f5065e10f`,
      options
    );
    const result = await response.json();
    const trailer = result.results?.find((movie) => movie.type === "Trailer");
    setMovieId(trailer?.key);
  };

  useEffect(() => {
    fetchVideoData();
  }, [props.movie_id]);

  return (
    <div className="relative w-screen h-screen overflow-hidden z-10">
      <iframe
  className="absolute inset-0 w-full h-full object-cover "
  src={`https://www.youtube.com/embed/${movieId}?autoplay=1&mute=1&playsinline=1`}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>


      <div className="xyz absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-20">
        <div className="absolute z-30 w-full p-4 md:w-2/3 lg:w-5/6 md:p-8 top-1/3 md:top-[35%] space-y-4 md:space-y-6">
          <h1 className="text-2xl text-white md:text-4xl lg:text-5xl font-bold">{props.title}</h1>
          <p className="text-sm text-slate-300 md:text-base lg:text-lg w-full md:w-3/4 lg:w-3/6 font-serif">{props.overview}</p>
          <h5 className="text-slate-400">Release Date: {props.date}</h5>
        </div>
      </div>
    </div>
  );
};

export default Headervedio;
