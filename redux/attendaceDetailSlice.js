import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {AxiosClient} from '../utility/AxiosClient';

const attendanceDetailSlice = createSlice({
  name: 'attendaceDetail',
  initialState: {
    attendanceDetailList: [],
    loading: false,
    error: '',
  },

  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getAttendanceDetails.pending), state => {
      state.loading = true;
    });
    builder.addMatcher(
      isAnyOf(getAttendanceDetails.fulfilled),
      (state, action) => {
        state.loading = false;
        state.attendanceDetailList = action.payload.Result;
      },
    );
    builder.addMatcher(
      isAnyOf(getAttendanceDetails.rejected),
      (state, action) => {
        state.loading = false;
      },
    );
  },
});

export default attendanceDetailSlice.reducer;

export const getAttendanceDetails = createAsyncThunk(
  'mobile/getAttendance',
  async (payload, toolkit) => {
    return await AxiosClient('POST', `/api/Admin/Attendance`, payload, toolkit);
  },
);
