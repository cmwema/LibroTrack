import { createSlice } from "@reduxjs/toolkit";

interface Authentication {
  authenticated: boolean;
}

const initialState: Authentication = {
  authenticated: localStorage.getItem("token") ? true : false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
});

export const authenticationReducer = authenticationSlice.reducer;
