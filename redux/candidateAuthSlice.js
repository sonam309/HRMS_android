import { createSlice } from "@reduxjs/toolkit";

const candidateAuthSlice = createSlice({
    name: "candidateAuth",
    initialState: { candidateId: null, candidateName: null, candidateStatusId: null, candidateStatus: null, candidatePhone: null, candidateRole: null, candidateRoleId: null, offerAcceptFlag: null, daysToJoin: null, candidateOfferLetter: null },
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
            

            console.log("authcandidate", state.totalDays, state.growingDays, state.daysToJoin)
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
                state.candidateOfferLetter = null
        }
    }
})

export const candidateAuthActions = candidateAuthSlice.actions;

export default candidateAuthSlice