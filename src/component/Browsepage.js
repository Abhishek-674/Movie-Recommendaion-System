import Navbar from "./Navbar";
import Headermovie from "./Headermovie";
import Nowplaying from "./Nowplaying";
import Upcoming from "./Upcoming";
import Popular from "./Popular";
import Toprated from "./Toprated"
const Browsepage=()=>{
    return(
            <div className="bg-black">
                <Navbar/>
                 <Headermovie/>
                 <Nowplaying/> 
                 <Upcoming/>
                 <Toprated/>
                 <Popular/>
                
            </div>
    )
}
export default Browsepage;