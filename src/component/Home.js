import { movie_poster_url } from "../utils/constant";
import logo2 from "../utils/images/logo3.png";

const Home = () => {
  return (
    <div className="relative">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          className="h-screen w-screen object-cover"
          src={movie_poster_url}
          alt=""
        />
      </div>
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />
      {/* Logo */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10 md:top-5 md:left-5 md:transform-none">
        <img className="w-28" src={logo2} alt="Logo" />
      </div>
    </div>
  );
};

export default Home;
