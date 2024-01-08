import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {AxiosClient} from '../utility/AxiosClient';

const interviewDetailSlice = createSlice({
  name: 'inteviewDetail',
  initialState: {
    inteviewListData: {},
    loading: false,
  },

  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getInterviewList.pending), state => {
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(getInterviewList.fulfilled), (state, action) => {
        console.log("gfhfyjhgjgujkukhkhkhkh",action.payload.Result)
      state.loading = false;
      state.inteviewListData = action.payload.Result;
    });
    builder.addMatcher(isAnyOf(getInterviewList.rejected), (state, action) => {
      state.loading = false;
    });
  },
});

export default interviewDetailSlice.reducer;

export const getInterviewList = createAsyncThunk(
  'mobile/getInteviewList',
  async (payload, toolkit) => {
    // return await AxiosClient("POST", `/api/saveEsignDataMob`, payload, toolkit);
    return await AxiosClient(
      'POST',
      `api/User/InterviewList`,
      payload,
      toolkit,
    );
  },
);
