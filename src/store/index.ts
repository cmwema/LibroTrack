import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modalSlice";
import { apiSlice } from "./api-slice";
import { crudReducer } from "./crud-slice";
import { authenticationReducer } from "./authSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    crud: crudReducer,
    authentication: authenticationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
