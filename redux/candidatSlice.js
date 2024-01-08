import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {AxiosClient} from '../utility/AxiosClient';

const candidateSlice = createSlice({
  name: 'candidateInfo',
  initialState: {
    candidateOfferCheckResult: [],
    loading: false,
  },

  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getCandidateOfferCheck.pending), state => {
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(getCandidateOfferCheck.fulfilled),
      (state, action) => {
        console.log('gfhfyjhgjgujkukhkhkhkh', action.payload.Result);
        state.loading = false;
        state.candidateOfferCheckResult = action.payload.Result;
      },
    );
    builder.addMatcher(
      isAnyOf(getCandidateOfferCheck.rejected),
      (state, action) => {
        state.loading = false;
      },
    );
  },
});

export default candidateSlice.reducer;

export const getCandidateOfferCheck = createAsyncThunk(
  'mobile/getCandidateOfferCheck',
  async (payload, toolkit) => {
    // return await AxiosClient("POST", `/api/saveEsignDataMob`, payload, toolkit);
    return await AxiosClient(
      'POST',
      `api/hrms/candidateOfferCheck`,
      payload,
      toolkit,
    );
  },
);
