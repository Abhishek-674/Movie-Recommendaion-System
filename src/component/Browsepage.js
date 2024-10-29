import Navbar from "./Navbar";
import Headermovie from "./Headermovie";
import Nowplaying from "./Nowplaying";
import Upcoming from "./Upcoming";
import Popular from "./Popular";
import Toprated from "./Toprated";
import Footer from "./Footer";

const Browsepage = () => {
    return (
        <div className="bg-black relative">
            <Navbar />
            <Headermovie />
                <div className="relative -mt-[80%] md:-mt-0"> {/* Apply negative margin for overlap */}
                <Nowplaying />
                <Upcoming />
                <Toprated />
                <Popular />
            </div>
            <Footer/>
        </div>
    );
};

export default Browsepage;
