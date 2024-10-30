import { getAuth, signOut } from "firebase/auth";
import { app1 } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import logo2 from "../utils/images/logo3.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { removeuser } from "../utils/Userslice";
import { Link } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mail, setEmail] = useState("xyz");

  const userEmail = useSelector((state) => state?.user?.name);

  useEffect(() => {
      setEmail(userEmail);
  }, [userEmail, navigate,mail]);

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

  const search_handler = () => {
    navigate("/search");
  };

  return (
    <div className="absolute top-0 left-0 flex w-full h-24 items-center justify-between text-white px-5 md:px-10 z-50 bg-opacity-80 bg-black backdrop-blur">
      <div className="flex items-center">
        <img className="w-14 md:w-20" src={logo2} alt="Logo" />
       
      </div>
      
      <div className="flex items-center space-x-6">
      <Link to="/b"><li className="text-white text-lg list-none font-semibold">Home</li></Link>
        <button
          onClick={search_handler}
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out px-5 py-2.5 flex items-center"
        >
          
          <span className="hidden md:block">MovieMentor</span>
          
          <span className="block md:hidden">Search</span>
        </button>
        <div  onClick={logout_handler} className="flex justify-center flex-col items-center ">
          <img
            
            className="w-8 h-8 rounded-full"
            src="https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg?semt=ais_hybrid"
            alt="Profile"
          />
          <h6 className="text-sm">{mail}</h6>
          <h6 className="text-sm">Logout</h6>
          {/* <h1 className=""></h1> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
