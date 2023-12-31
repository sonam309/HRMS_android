import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AxiosClient } from "../utility/AxiosClient";

const eSignSlice = createSlice({
    name: "eSign",
    initialState: {
        candidateList: [],
        coordinatesList:{},
        coordinateLoading:false,
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

          builder.addMatcher(isAnyOf(getCoordinates.pending), (state) => {
            state.coordinateLoading = true;
          });
          builder.addMatcher(
            isAnyOf(getCoordinates.fulfilled),
            (state, action) => {
                // console.log("coordinates",action.payload.Result[0])
              state.coordinateLoading = false;
              state.coordinatesList = action.payload.Result[0];
            }
          );
          builder.addMatcher(
            isAnyOf(getCoordinates.rejected),
            (state, action) => {
              state.coordinateLoading = false;
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

export const getCoordinates = createAsyncThunk(
  "mobile/getCoordinates",
  async (payload, toolkit) => {
      return await AxiosClient("POST", `/api/saveEsignCordinate`, payload, toolkit);
  }
);