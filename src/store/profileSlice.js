import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("LoggedUser"));
let imageIsExist = currentUser ? currentUser.hasOwnProperty("image") : false;

const initialState = {
  profilePic: imageIsExist
    ? currentUser.image
    : "https://upload.wikimedia.org/wikipedia/commons/3/30/Chuck_Norris_May_2015.jpg",
  username: "",
};

// // First, create the thunk
// export const fetchRandom = createAsyncThunk(
//     'users/fetchRandomCocktail',
//     async () => {
//       const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
//       return new Cocktail(response.data.drinks[0]);
//     }
// );

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    changeProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
  },
});

// action creators
export const { changeProfilePic } = profileSlice.actions;

export default profileSlice.reducer;
