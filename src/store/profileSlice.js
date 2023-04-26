import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialPic = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeAzNngALaMgX_uPPT6wYYjXjszPQgPBCGu_r4Vj4U6hz7WlXj";

const currentUser = JSON.parse(localStorage.getItem("LoggedUser"));
let imageIsExist = currentUser ? currentUser.hasOwnProperty("image") : false;

const initialState = {
  profilePic: initialPic,
  username: "",
  isLoggedIn: false,
};

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    changeProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    updateUser: (state, action) => {
      state.profilePic = action.payload.image;
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.nickname = action.payload.nickname;
    },
    logout: (state, action) => {
      state.profilePic = initialPic;
      state.isLoggedIn = false;
      state.username = "";
      state.nickname = "";
    },
  },
});

// action creators
export const { changeProfilePic, updateUser, logout } = profileSlice.actions;

export default profileSlice.reducer;
