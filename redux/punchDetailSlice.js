import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {AxiosClient} from '../utility/AxiosClient';

const punchDetailSlice = createSlice({
  name: 'punchDetail',
  initialState: {
    currentLocation: '',
    punchTime: {},
    loading: false
  },

  extraReducers: builder => {
    // builder.addMatcher(isAnyOf(getCandidateList.pending), (state) => {
    //     state.loading = true;
    //   });
    //   builder.addMatcher(
    //     isAnyOf(getCandidateList.fulfilled),
    //     (state, action) => {
    //       state.loading = false;
    //       state.candidateList = action.payload.Result;
    //     }
    //   );
    //   builder.addMatcher(
    //     isAnyOf(getCandidateList.rejected),
    //     (state, action) => {
    //       state.loading = false;
    //     }
    //   );
  },

  reducers: {
    updateCurrentLocation(state, action) {
      state.currentLocation = action.payload;
    },

    updatePunchTime(state, action) {
      state.punchTime = action.payload?.punchTime;
      state.loading = action.payload?.loading
    },
  },
});

export const {updateCurrentLocation,updatePunchTime} = punchDetailSlice.actions;
export default punchDetailSlice.reducer;

// export const getCandidateList = createAsyncThunk(
//     "mobile/getCandidate",
//     async (payload, toolkit) => {
//         // return await AxiosClient("POST", `/api/saveEsignDataMob`, payload, toolkit);
//         return await AxiosClient("POST", `/api/saveEsignDataNew`, payload, toolkit);
//     }
// );
