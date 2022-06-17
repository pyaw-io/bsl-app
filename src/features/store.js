import { configureStore } from "@reduxjs/toolkit";
import readingSlice from "./readingSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {  reading: readingSlice, authenticate: authSlice},
});

