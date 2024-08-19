import { configureStore } from "@reduxjs/toolkit";
import category from "./slices/categoriesSlice";
import darkMood from "./slices/darkMoodSlice";
import user from "./slices/userSlice";
import cart from "./slices/cartSlice";
import product from "./slices/productSlice";
import lang from "./slices/langSlice";
import WishList from "./slices/WishListSlice";

export const store = configureStore({
  reducer: {
    product,
    category,
    darkMood,
    lang,
    cart,
    user,
    WishList,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
