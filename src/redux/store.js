import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "@/redux/dataSlice.js";
import { persistStore } from "redux-persist";
import authReducer from "@/redux/authSlice.js";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    auth: authReducer,
  },
});
