import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {AxiosClient} from '../utility/AxiosClient';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    locationListData: {},
    locationLoading: false,
  },

  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getLocationList.pending), state => {
      state.locationLoading = true;
    });
    builder.addMatcher(isAnyOf(getLocationList.fulfilled), (state, action) => {
      state.locationLoading = false;
      state.locationListData = action.payload.Result;
    });
    builder.addMatcher(isAnyOf(getLocationList.rejected), (state, action) => {
      state.locationLoading = false;
    });
  },
});

export default locationSlice.reducer;

export const getLocationList = createAsyncThunk(
  'mobile/getLocationList',
  async (payload, toolkit) => {
    return await AxiosClient(
      'POST',
      `api/User/jobLocationMapped`,
      payload,
      toolkit,
    );
  },
);
