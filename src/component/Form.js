import { useState, useRef } from "react";
import { validation } from "./Validation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import {auth} from '../utils/firebase'
import { adduser } from "../utils/Userslice";
import { app1 } from "../utils/firebase";

import { createUserWithEmailAndPassword ,getAuth,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
const Form = () => {
  const dispatch=useDispatch();
  const [signedin, setsignedin] = useState(true);
  const navigate=useNavigate();
//   const [credential_valid, setcredential_valid] = useState(true);
  const [credentialmsg, setcredentialmsg] = useState("");
  const email = useRef();
  const pass = useRef();
  const name=useRef();
  const signup_handler = () => {
    if (signedin) setsignedin(false);
    else setsignedin(true);
  };
  const submit_handler = () => {
    const msg = validation(email.current.value, pass.current.value);
    setcredentialmsg(msg);
    if (msg !== null) {
      return;
    }
    if(signedin===false)
    {
        const auth = getAuth(app1);
        createUserWithEmailAndPassword(auth, email.current.value, pass.current.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value
            }).then(() => {
              // Profile updated!
              dispatch(adduser({email:auth.currentUser.email,name:auth.currentUser.displayName}))
              navigate("/b");
              // ...
            }).catch((error) => {
              // An error occurred
              // ...
              alert(error)
            });
            
            // console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error Code:", error.code);
            console.error("Error Message:", error.message);
            alert(errorMessage);
            // ..
        });
        
    }
    else{
        const auth = getAuth(app1);
        signInWithEmailAndPassword(auth, email.current.value, pass.current.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            dispatch(adduser({email:user.email,name:user.displayName}))
            // console.log(user);
            navigate("/b");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Invalid Credential...No account found with this email")
        });
      

    }
   
    

  };

  return (
    <div className="absolute w-1/3 min-h-96 left-1/3 top-1/4 p-10 bg-black rounded-lg opacity-90">
      <h1 className="text-white font-bold text-3xl p-2 ml-6 ">
        {signedin === true ? "Sign in" : "Sign Up"}
      </h1>
      <form
        onSubmit={(e) => 
          e.preventDefault()
        }
        action=""
        className="flex flex-col p-4 text-black "
      >
        {signedin === false && (
          <input ref={name} className=" h-10 m-3" type="text" placeholder="Enter Name" />
        )}
        <input
          ref={email}
          className=" h-10 m-3 rounded-sm "
          type="email"
          placeholder="Enter Email"
        />
        <input
          ref={pass}
          className=" h-10 m-3 rounded-sm"
          type="password"
          placeholder="Enter Password"
        />
        {credentialmsg !== null && (
          <span className="text-red-500 ml-10">{credentialmsg}</span>
        )}
        <button
          onClick={submit_handler}
          className=" h-10 m-3 rounded-sm bg-red-500 text-white"
        >
          Submit
        </button>
        <p
          onClick={signup_handler}
          className=" ml-[30%] mt-2 cursor-pointer text-blue-500"
        >
          {signedin === true
            ? "Not have an account/signup"
            : "Already a member/sign in"}
        </p>
      </form>
    </div>
  );
};
export default Form;
