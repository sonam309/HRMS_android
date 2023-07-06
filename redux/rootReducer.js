import {combineReducers} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import candidateAuthSlice from "./candidateAuthSlice"

export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    candidateAuth : candidateAuthSlice.reducer
})