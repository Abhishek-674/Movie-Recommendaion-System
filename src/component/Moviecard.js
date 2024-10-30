import React from "react";

const Moviecard = (props) => {
  return (
    <div
      className="cursor-pointer mt-14 w-44 flex-shrink-0 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-100 hover:scale-110"
      onClick={props.onClick} // Apply onClick handler
    >
      <img
        className="w-full h-auto rounded-md"
        src={`https://image.tmdb.org/t/p/original/${props.poster_id}`}
        alt="Movie Poster"
      />
      <h1 className="bg-black text-white text-center text-xl font-semibold">{props.name}</h1>
    </div>
  );
};

export default Moviecard;
