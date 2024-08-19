import { createSlice } from "@reduxjs/toolkit";

const initialState: { isArabic: boolean } = {
  isArabic: false,
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    /**check lang state in local storage  */
    checkLangState: (state) => {
      if (localStorage.getItem("lang") === "true") {
        state.isArabic = true;
      } else {
        state.isArabic = false;
      }
    },
    /**set lang state in Local storage */
    setLangState: (state, action) => {
      localStorage.setItem("lang", action.payload);
      state.isArabic = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLangState, checkLangState } = langSlice.actions;

export default langSlice.reducer;
