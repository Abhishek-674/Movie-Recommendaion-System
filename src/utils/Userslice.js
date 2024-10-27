import { createSlice } from "@reduxjs/toolkit"

const Userslice=createSlice({
     name:"user",
     initialState:null,
     reducers:{
        adduser:(state,action)=>{
            return action.payload;
        },
        removeuser:(state,action)=>{
            return null;
        },
     },
});
export const {adduser,removeuser}=Userslice.actions;
export default Userslice.reducer;