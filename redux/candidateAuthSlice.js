import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-test-renderer";

const candidateAuthSlice = createSlice({
    name: "candidateAuth",
    initialState: {
        candidateId: null,
        candidateName: null,
        candidateStatusId: null,
        candidateStatus: null,
        candidatePhone: null,
        candidateRole: null,
        candidateRoleId: null,
        offerAcceptFlag: null,
        daysToJoin: null,
        candidateOfferLetter: null,
        growingDays: null,
        totalDay: null,
        hiringLeadMail: null
    },
    reducers: {
        logIn(state, actions) {
            state.candidateId = actions.payload?.candidateId
            state.candidateName = actions.payload?.candidateName
            state.candidateStatusId = actions.payload?.candidateStatusId
            state.candidateStatus = actions.payload?.candidateStatus
            state.candidatePhone = actions.payload?.candidatePhone
            state.candidateRole = actions.payload?.candidateRole
            state.candidateRoleId = actions.payload?.candidateRoleId
            state.offerAcceptFlag = actions.payload?.offerAcceptFlag
            state.daysToJoin = actions.payload?.daysToJoin
            state.candidateOfferLetter = actions.payload?.candidateOfferLetter
            state.growingDays = actions.payload?.growingDays
            state.totalDay = actions.payload?.totalDay
            state.hiringLeadMail = actions.payload?.hiringLeadMail


        },
        updateLogin(state, actions) {
            state.candidateStatusId = actions.payload?.candidateStatusId
            state.candidateStatus=actions.payload?.candidateStatus
        },
        logOut(state) {
            state.candidateStatusId = null,
                state.candidateStatus = null,
                state.candidatePhone = null,
                state.candidateRole = null,
                state.candidateRoleId = null,
                state.candidateName = null,
                state.candidateId = null,
                state.offerAcceptFlag = null,
                state.daysToJoin = null,
                state.candidateOfferLetter = null,
                state.growingDays = null,
                state.totalDay = null,
                state.hiringLeadMail = null
        }
    }
})

export const candidateAuthActions = candidateAuthSlice.actions;

export default candidateAuthSlice