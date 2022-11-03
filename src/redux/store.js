import { configureStore } from "@reduxjs/toolkit";
import refreshReducer from "./refreshSlice";
import newsReducer from "./newsSlice";

export default configureStore({
  reducer: {
    news: newsReducer,
    refresh: refreshReducer,
  },
});
