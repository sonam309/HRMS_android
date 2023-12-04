import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {AxiosClient} from '../utility/AxiosClient';

const attendanceDetailSlice = createSlice({
  name: 'attendaceDetail',
  initialState: {
    attendanceDetailList: [],
    attendanceDailyDataList: {},
    regularizationList: {},
    attendanceLoading: false,
    calanderloading: false,
    regulizationLoding: false,
    error: '',
  },

  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getAttendanceDetails.pending), state => {
      state.calanderloading = true;
    });
    builder.addMatcher(
      isAnyOf(getAttendanceDetails.fulfilled),
      (state, action) => {
        state.calanderloading = false;
        state.attendanceDetailList = action.payload.Result;
      },
    );
    builder.addMatcher(
      isAnyOf(getAttendanceDetails.rejected),
      (state, action) => {
        state.calanderloading = false;
      },
    );

    builder.addMatcher(isAnyOf(getAttendanceDailyDetails.pending), state => {
      state.attendanceLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getAttendanceDailyDetails.fulfilled),
      (state, action) => {
        state.attendanceLoading = false;
        console.log('ghfwhdgjhgdxj', action.payload.Result[0]);
        state.attendanceDailyDataList = action.payload.Result[0];
      },
    );
    builder.addMatcher(
      isAnyOf(getAttendanceDailyDetails.rejected),
      (state, action) => {
        state.attendanceLoading = false;
      },
    );

    builder.addMatcher(isAnyOf(saveRegulization.pending), state => {
      state.regulizationLoding = true;
    });
    builder.addMatcher(isAnyOf(saveRegulization.fulfilled), (state, action) => {
      state.regulizationLoding = false;
      state.regularizationList = action.payload.Result[0];
    });
    builder.addMatcher(isAnyOf(saveRegulization.rejected), (state, action) => {
      state.regulizationLoding = false;
    });
  },
});

export default attendanceDetailSlice.reducer;

export const getAttendanceDetails = createAsyncThunk(
  'mobile/getAttendance',
  async (payload, toolkit) => {
    return await AxiosClient('POST', `/api/Admin/Attendance`, payload, toolkit);
  },
);

export const getAttendanceDailyDetails = createAsyncThunk(
  'mobile/getAttendanceDailyDetails',
  async (payload, toolkit) => {
    return await AxiosClient(
      'POST',
      `/api/Admin/AttendanceDay`,
      payload,
      toolkit,
    );
  },
);

export const saveRegulization = createAsyncThunk(
  'mobile/saveRegulization',
  async (payload, toolkit) => {
    return await AxiosClient(
      'POST',
      `/api/Regulize`,
      payload,
      toolkit,
      'application/x-www-form-urlencoded',
    );
  },
);
