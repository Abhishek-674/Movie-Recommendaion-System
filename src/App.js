// App.js
import React, { useEffect } from "react";
import Landingpage from "./component/Landingpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { Appstore } from "./utils/Appstore";
import Browsepage from "./component/Browsepage";
import Searchmovie from "./component/Searchmovie";
import Moviementor from "./component/Moviementor";
import MovieDetail from "./component/MovieDetail"; // Import the new component
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app1 } from "./utils/firebase";
import { adduser, removeuser } from "./utils/Userslice";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component

const App = () => {
  const dispatch = useDispatch();
  const auth = getAuth(app1);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(adduser({ email: user.email, name: user.displayName }));
      } else {
        // User is signed out
        dispatch(removeuser());
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [auth, dispatch]);

  return (
    <Provider store={Appstore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/search" element={<ProtectedRoute element={<Moviementor />} />} />
          <Route path="/movie/:movieId" element={<ProtectedRoute element={<MovieDetail />} />} />
          <Route path="/b" element={<ProtectedRoute element={<Browsepage />} />} /> {/* Protecting the Browsepage */}
          {/* Add more protected routes here as needed */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
