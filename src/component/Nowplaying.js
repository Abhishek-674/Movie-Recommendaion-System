import { useEffect, useState } from "react";
import { options } from "../utils/constant";
import Moviecard from "./Moviecard";
import "./Nowplaying_style.css";

const Nowplaying = () => {
  const [nowPlayingData, setNowPlayingData] = useState();

  const nowPlaying = async () => {
    const x = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=6dc74219d2cf71796144e04f5065e10f",
      options
    );
    const result = await x.json();
    setNowPlayingData(result?.results);
  };

  useEffect(() => {
    nowPlaying();
  }, []);

  return (
    <div className="p-6 -mt-[10%] pb-[12%] relative z-30 w-full"> {/* Added pb-[10%] */}
      <h1 className="text-white font-bold font-sans text-2xl -mb-8 ml-3">Now Playing</h1>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {nowPlayingData &&
          nowPlayingData.map((movie) => (
            <Moviecard key={movie.id} poster_id={movie.poster_path} />
          ))}
      </div>
    </div>
  );
};

export default Nowplaying;
