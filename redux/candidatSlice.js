import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {AxiosClient} from '../utility/AxiosClient';

const candidateSlice = createSlice({
  name: 'candidateInfo',
  initialState: {
    candidateOfferCheckResult: {},
    candidateBasicDetailsResult: [],
    loading: false,
    cbdloading: false,
  },

  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getCandidateOfferCheck.pending), state => {
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(getCandidateOfferCheck.fulfilled),
      (state, action) => {
        state.loading = false;
        state.candidateOfferCheckResult = action.payload.Result[0];
        // console.log('datattatata2222',action.payload);
      },
    );
    builder.addMatcher(
      isAnyOf(getCandidateOfferCheck.rejected),
      (state, action) => {
        state.loading = false;
      },
    );



    builder.addMatcher(isAnyOf(getCandidateBasicDetails.pending), state => {
      state.cbdloading = true;
    });
    builder.addMatcher(
      isAnyOf(getCandidateBasicDetails.fulfilled),
      (state, action) => {
        state.cbdloading = false;
        // state.candidateBasicDetailsResult = action.payload.Result;

        console.log('gfhfyjhgjgujkukhkhkhkh', action.payload.Result);
      },
    );
    builder.addMatcher(
      isAnyOf(getCandidateBasicDetails.rejected),
      (state, action) => {
        state.cbdloading = false;
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

export const getCandidateBasicDetails = createAsyncThunk(
  'mobile/getCandidateBasicDetails',
  async (payload, toolkit) => {
    return await AxiosClient('POST', `/api/addCandidate`, payload, toolkit);
  },
);
