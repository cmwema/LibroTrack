import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  changed: boolean;
}

const initialState: ModalState = {
  changed: false,
};

const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    setChanged: (state, action) => {
      state.changed = action.payload;
    },
  },
});

export const { setChanged } = crudSlice.actions;
export const crudReducer = crudSlice.reducer;
