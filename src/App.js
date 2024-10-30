import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { adduser, removeuser } from "./utils/Userslice";
import { Appstore } from "./utils/Appstore";
import Landingpage from "./component/Landingpage";
import Browsepage from "./component/Browsepage";
import Moviementor from "./component/Moviementor";
import MovieDetail from "./component/MovieDetail";
import ProtectedRoute from "./ProtectedRoute";
import { app1 } from "./utils/firebase";
import MovieDetailofbrowsepage from "./component/MovieDetailofbrowsepage";

const App = () => {
  const dispatch = useDispatch();
  const auth = getAuth(app1);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(adduser(user));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = { email: user.email, name: user.displayName };
        dispatch(adduser(userData));
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        dispatch(removeuser());
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <Provider store={Appstore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/search" element={<ProtectedRoute element={<Moviementor />} />} />
          <Route path="/movie/:movieId" element={<ProtectedRoute element={<MovieDetail />} />} />
          <Route path="/b/:movieId" element={<ProtectedRoute element={<MovieDetailofbrowsepage />} />} />
          <Route path="/b" element={<ProtectedRoute element={<Browsepage />} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
