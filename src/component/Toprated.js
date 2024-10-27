import { useState } from "react";
import { options } from "../utils/constant";
import Moviecard from "./Moviecard";
const Upcoming=()=>{
    const [data,setdata]=useState();
    const upcoming_data=async()=>{
        const x = await fetch(
            "https://api.themoviedb.org/3/movie/top_rated?api_key=6dc74219d2cf71796144e04f5065e10f",
            options
          );
          const result = await x.json();
          console.log()
          setdata(result?.results);
    }
  useState(()=>{
    upcoming_data();
  },[])
    return(
        <div className="p-4 -mt-[10%] pb-[12%] relative z-30"> {/* Added pb-[10%] */}
        <h1 className="text-white font-bold font-sans text-2xl -mb-8 ml-2">Top Rated </h1>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {data &&
            data.map((movie) => (
              <Moviecard key={movie.id} poster_id={movie.poster_path} />
            ))}
        </div>
      </div>
    )
}
export default Upcoming;