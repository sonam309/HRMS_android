import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    userName: null,
    userDept: null,
    userPassword: null,
    userDeptId: null,
    userEmail: null,
    authenticated: false
  },
  reducers: {
    logIn(state, actions) {
      state.userId = actions.payload?.userId;
      state.userName = actions.payload?.userName;
      state.userDept = actions.payload?.userDept;
      state.userDeptId = actions.payload?.userDeptId;
      state.userPassword = actions.payload?.userPassword;
      state.userEmail = actions.payload?.userEmail;
      state.authenticated = actions.payload?.authenticated
    },
    logOut(state) {
      state.userDept = null,
        state.userDeptId = null,
        state.userId = null,
        state.userName = null,
        state.userPassword = null,
        state.userEmail = null,
        state.authenticated = false
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
