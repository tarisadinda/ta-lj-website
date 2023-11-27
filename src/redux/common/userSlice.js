import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    email: "",
    full_name: "",
    img: "",
    username: "",
    candidate_detail: {
      address: "",
      createdAt: "",
      cv: null,
      id: null,
      description: "",
      phone_number: "",
      status_completed: false,
      updatedAt: "",
      user_id: null,
      skill: []
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    updateUser: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;

export const selectUser = (state) => state.user.userData;

export default userSlice.reducer;
