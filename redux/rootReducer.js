import {combineReducers} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import candidateAuthSlice from "./candidateAuthSlice"
import eSignSlice from "./eSignSlice"
import punchDetailSlice from "./punchDetailSlice"
import attendaceDetailSlice from "./attendaceDetailSlice"
import interviewDetailSlice from "./interviewDetailSlice"
import candidatSlice from "./candidatSlice"
import aprovalPendingSlice from "./aprovalPendingSlice"
import aadharValidationSlice from "./aadharValidationSlice"
import locationSlice from "./locationSlice"


export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    candidateAuth : candidateAuthSlice.reducer,
    eSign: eSignSlice,
    punchDetail: punchDetailSlice,
    inteviewDetail:interviewDetailSlice,
    attendaceDetail:attendaceDetailSlice,
    candidateInfo:candidatSlice,
    aprovalPending:aprovalPendingSlice,
    aadharValidation:aadharValidationSlice,
    location:locationSlice,
})