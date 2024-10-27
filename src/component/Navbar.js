import { getAuth, signOut } from "firebase/auth";
import { app1 } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import logo2 from "../utils/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { removeuser } from "../utils/Userslice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mail, setEmail] = useState("xyz");

  const userEmail = useSelector((state) => state?.user?.name);

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
    } else {
      setEmail(userEmail);
    }
  }, [userEmail, navigate]);

  const logout_handler = () => {
    const auth = getAuth(app1);
    signOut(auth)
      .then(() => {
        dispatch(removeuser());
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="absolute top-0 left-0 flex w-full h-24 items-center justify-between text-white px-5 md:px-10 z-50">
      <div className="flex items-center">
        <img className="w-20 md:w-28" src={logo2} alt="Logo" />
        <ul className="hidden md:flex space-x-6 ml-8">
          <li className="cursor-pointer hover:text-red-400">Home</li>
          <li className="cursor-pointer hover:text-red-400">Movies</li>
          <li className="cursor-pointer hover:text-red-400">TV Shows</li>
          <li className="cursor-pointer hover:text-red-400">News</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        <img
          className="w-8 h-8 rounded-full"
          src="https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg?semt=ais_hybrid"
          alt="Profile"
        />
        <button
          onClick={logout_handler}
          className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded-full text-sm font-medium transition"
        >
          <h1>Logout</h1>
          <h6 className="text-xs">{mail}</h6>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
