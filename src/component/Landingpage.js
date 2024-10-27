import Home from "./Home";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { app1 } from "../utils/firebase";
import { adduser, removeuser } from "../utils/Userslice";
function Landingpage() {
  const navigate=useNavigate();
  const dispatch =useDispatch();
  useEffect(() => {
     const auth = getAuth(app1);
     onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        dispatch(adduser({email:auth.currentUser.email,name:auth.currentUser.displayName}))
        navigate("/b")
      } else {
        console.log("hello")
        dispatch(removeuser());
        navigate("/");
        // User is signed out
        // ...
      }
    });
  },[]);
  return (
        <div>
           <Home/>
           <Form/>
        </div>
  );
}

export default Landingpage;
