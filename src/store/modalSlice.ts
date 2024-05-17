import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  open: boolean;
}

const initialState: ModalState = {
  open: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state) => {
      state.open = true;
    },
    setModalClose: (state) => {
      state.open = false;
    },
  },
});

export const { setModalClose, setModalOpen } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
