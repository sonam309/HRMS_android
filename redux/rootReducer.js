import {combineReducers} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import candidateAuthSlice from "./candidateAuthSlice"
import eSignSlice from "./eSignSlice"


export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    candidateAuth : candidateAuthSlice.reducer,
     eSign: eSignSlice,
})