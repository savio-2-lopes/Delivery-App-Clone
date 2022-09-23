import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./store/basketSlice";
import restaurantReducer from "./store/restaurantSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
});
