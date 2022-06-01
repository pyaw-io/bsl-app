import { configureStore } from "@reduxjs/toolkit";
import readingSlice from "./readingSlice";

export const store = configureStore({
  reducer: {  reading: readingSlice},
});
