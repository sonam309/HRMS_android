import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errormessage: "",
  successmesssage: "",
  unauth: "",
};

const messageSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    setErrorMessageRedux: (state, action) => {
      state.errormessage = action.payload;
    },
    setSuccessMessageRedux: (state, action) => {
      state.successmesssage = action.payload;
    },
    setUnAuthMessageRedux: (state, action) => {
      state.unauth = action.payload;
    },
    emptyMessage: (state, action) => {
      state.errormessage = "";
      state.successmesssage = "";
      state.unauth = "";
    },
  },
});

export const {
  setErrorMessageRedux,
  emptyMessage,
  setSuccessMessageRedux,
  setUnAuthMessageRedux,
} = messageSlice.actions;

export default messageSlice.reducer;
