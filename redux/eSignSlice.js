import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AxiosClient } from "../utility/AxiosClient";

const eSignSlice = createSlice({
    name: "eSign",
    initialState: {
        candidateList: [],
        loading: false,
        error: ""
    },
    extraReducers: (builder)=>{
        builder.addMatcher(isAnyOf(getCandidateList.pending), (state) => {
            state.loading = true;
          });
          builder.addMatcher(
            isAnyOf(getCandidateList.fulfilled),
            (state, action) => {
                console.log(action)
              state.loading = false;
              state.candidateList = action.payload.Result;
            }
          );
          builder.addMatcher(
            isAnyOf(getCandidateList.rejected),
            (state, action) => {
              state.loading = false;
            }
          );
    }
})


export default eSignSlice.reducer

export const getCandidateList = createAsyncThunk(
    "mobile/getCandidate",
    async (payload, toolkit) => {
        return await AxiosClient("POST", `/api/saveEsignDataMob`, payload, toolkit);
    }
);