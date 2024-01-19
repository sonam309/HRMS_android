import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {AxiosClient} from '../utility/AxiosClient';

const aprovalPendingSlice = createSlice({
  name: 'aprovalPending',
  initialState: {
    pendingApprovalList: {},
    loading: false,
  },

  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getpendingApprovalsData.pending), state => {
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(getpendingApprovalsData.fulfilled), (state, action) => {
      state.loading = false;
      state.pendingApprovalList = action.payload.Result;
    });
    builder.addMatcher(isAnyOf(getpendingApprovalsData.rejected), (state, action) => {
      state.loading = false;
    });
  },
});

export default aprovalPendingSlice.reducer;

export const getpendingApprovalsData = createAsyncThunk(
  'mobile/getpendingApprovalsData',
  async (payload, toolkit) => {
    return await AxiosClient(
      'POST',
      `api/hrms/getMailnotification`,
      payload,
      toolkit,
    );
  },
);
