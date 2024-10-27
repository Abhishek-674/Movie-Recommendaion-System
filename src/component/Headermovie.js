import { useEffect, useState } from "react";
import Headervedio from "./Headervedio";
import { options } from "../utils/constant";
const Headermovie=()=>{
    const [header_movie_data,setheader_movie_data]=useState({});
    const [header_movie_id,setheader_movie_id]=useState();
    const [releasedate,setreleasedate]=useState();
    const [title,settitle]=useState("");
    const [overview,setoverview]=useState("");
    const[flag,setflag]=useState(false);
    const header_movie= async()=>{
        const header_movie= await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=6dc74219d2cf71796144e04f5065e10f",options)
        const result= await header_movie.json();
        // console.log(result?.results[0]?.id);
        const randomIndex = Math.floor(Math.random() * Math.min(result.results.length, 20));
    setheader_movie_id(result?.results[randomIndex]?.id);
    settitle(result?.results[randomIndex]?.title);
    setoverview(result?.results[randomIndex]?.overview);
    setreleasedate(result?.results[randomIndex]?.release_date)
        setflag(true);
       
    }
    useEffect(()=>{
            header_movie();
    },[])
    return(
             <div>
                {
                  flag&&<Headervedio  movie_id={header_movie_id} title={title} overview={overview} date={releasedate}/>
                }
             </div>
    )
}
export default Headermovie;