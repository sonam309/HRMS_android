import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{userId:null, userName:null, userDept:null, userPassword:null, userDeptId:null,userEmail:null},
    reducers:{
        logIn(state, actions){
            state.userId = actions.payload?.userId
            state.userName = actions.payload?.userName
            state.userDept = actions.payload?.userDept
            state.userDeptId = actions.payload?.userDeptId
            state.userPassword = actions.payload?.userPassword
            state.userEmail=actions.payload?.userEmail
        },
        logOut(state){
            state.userDept = null,
            state.userDeptId = null,
            state.userId = null,
            state.userName = null,
            state.userPassword = null,
            state.userEmail=null
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice