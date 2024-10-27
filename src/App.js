import React from "react";
import Landingpage from "./component/Landingpage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Provider} from "react-redux";
import {Appstore} from "./utils/Appstore";
import Browsepage from "./component/Browsepage";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './utils/Appstore';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { removeuser } from "../utils/Userslice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app1 } from "./utils/firebase";
import { adduser,removeuser} from "./utils/Userslice";

const App = () => {
  const dispatch =useDispatch();
  // const navigate=useNavigate();
  useEffect(() => {
    const auth = getAuth(app1);
    onAuthStateChanged(auth, (user) => {
     if (user) {
       // const uid = user.uid;
       dispatch(adduser({email:auth.currentUser.email,name:auth.currentUser.displayName}))
      //  navigate("/b")
     } else {
       console.log("hello")
       dispatch(removeuser());
      //  navigate("/");
       // User is signed out
       // ...
     }
   });
 },[]);
  return (
    <Provider store={Appstore}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route
            path="/b"
            element={<Browsepage/>}
          ></Route>
        </Routes>
      </BrowserRouter>
      {/* </PersistGate> */}
      
    </Provider>
  );
};

export default App;
