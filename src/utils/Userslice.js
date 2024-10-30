import { createSlice } from "@reduxjs/toolkit";

// Load persisted user data from localStorage
const initialState = JSON.parse(localStorage.getItem("user")) || null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    adduser: (state, action) => {
      state = action.payload;
      localStorage.setItem("user", JSON.stringify(state)); // Persist user data
      return state;
    },
    removeuser: (state) => {
      state = null;
      localStorage.removeItem("user"); // Clear persisted data
      return state;
    },
  },
});

export const { adduser, removeuser } = userSlice.actions;
export default userSlice.reducer;
