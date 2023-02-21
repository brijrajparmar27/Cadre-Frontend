import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: [],
};
const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    setLoginData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { setLoginData } = LoginSlice.actions;
export default LoginSlice.reducer;