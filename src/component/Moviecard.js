import React from "react";

const Moviecard = (props) => {
  return (
    <div className="cursor-pointer bg-slate-500 mt-14 w-44 flex-shrink-0 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-110">
      <img
        className="w-full h-auto"
        src={`https://image.tmdb.org/t/p/original/${props.poster_id}`}
        alt="Movie Poster"
      />
    </div>
  );
};

export default Moviecard;
