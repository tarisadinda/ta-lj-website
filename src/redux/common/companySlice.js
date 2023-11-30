import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyData: {
    username: "",
    email: "",
    full_name: "",
    img: "",
    company_detail: {
      id: null,
      user_id: null,
      address: "",
      about_company: "",
      phone_number: "",
      status_disband: false,
      status_verif: false,
      status_completed: false,
      createdAt: "",
      updateAt: "",
    },
  },
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.companyData = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;

export const selectCompany = (state) => state.company.companyData;

export default companySlice.reducer;
