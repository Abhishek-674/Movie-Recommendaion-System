import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Userslice"
export const Appstore=configureStore({
      reducer:{
            user:userReducer,
      },
})
// export Appstore;