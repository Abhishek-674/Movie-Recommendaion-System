import { useState, useRef, useEffect } from "react";
import { validation } from "./Validation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adduser } from "../utils/Userslice";
import { app1 } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signedin, setsignedin] = useState(true);
  const [credentialmsg, setcredentialmsg] = useState("");
  const email = useRef();
  const pass = useRef();
  const name = useRef();
  const auth = getAuth(app1);

  // Check if the user is already logged in
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      dispatch(adduser({ email: user.email, name: user.displayName }));
      navigate("/b"); // Redirect to the main page if already signed in
    }
  }, [auth, dispatch, navigate]);

  const signup_handler = () => {
    setsignedin(!signedin);
  };

  const submit_handler = async () => {
    const msg = validation(email.current.value, pass.current.value);
    setcredentialmsg(msg);
    if (msg) return;

    try {
      if (!signedin) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          pass.current.value
        );

        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name.current.value,
        });

        dispatch(adduser({ email: user.email, name: user.displayName }));
        navigate("/b");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          pass.current.value
        );

        const user = userCredential.user;
        dispatch(adduser({ email: user.email, name: user.displayName }));
        navigate("/b");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5 bg-black bg-opacity-75">
      <div className="w-full max-w-sm h-[55vh] p-8 bg-black rounded-lg shadow-lg opacity-90">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col h-full mt-3">
          <h1 className="text-white font-bold text-3xl text-center mb-4">
            {signedin ? "Sign In" : "Sign Up"}
          </h1>
          {!signedin && (
            <input
              ref={name}
              className="h-12 mb-4 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-red-500"
              type="text"
              placeholder="Enter First Name"
            />
          )}
            {!signedin && (
            <input
              
              className="h-12 mb-4 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-red-500"
              type="text"
              placeholder="Enter Last Name"
            />
          )}
          <input
            ref={email}
            className="h-12 mb-4 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-red-500"
            type="email"
            placeholder="Enter Email"
            required
          />
          <input
            ref={pass}
            className="h-12 mb-4 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-red-500"
            type="password"
            placeholder="Enter Password"
            required
          />
          {credentialmsg && (
            <span className="text-red-500 text-center mb-4">{credentialmsg}</span>
          )}
          <button
            onClick={submit_handler}
            className="h-12 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Submit
          </button>
          <p
            onClick={signup_handler}
            className="mt-4 text-blue-400 text-center cursor-pointer"
          >
            {signedin ? "Don't have an account? Sign Up" : "Already a member? Sign In"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Form;
