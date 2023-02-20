import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  LoginData: [],
};
const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    setLoginData(state, action) {
      state.LoginData = action.payload;
    },
  },
});

export const { setLoginData } = LoginSlice.actions;
export default LoginSlice.reducer;