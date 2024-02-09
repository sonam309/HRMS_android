import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {AxiosClient} from '../utility/AxiosClient';


const aadharValidationSlice = createSlice({
    name: 'aadharValidation',
    initialState: {
      aadharValidationResult: {},
      verifyOtpResult:{},
      loading: false,
      otpLoading:false,
    },
  
    extraReducers: builder => {
      builder.addMatcher(isAnyOf(getAadharValidation.pending), state => {
        state.loading = true;
      });
      builder.addMatcher(isAnyOf(getAadharValidation.fulfilled), (state, action) => {
        state.loading = false;
        state.aadharValidationResult = action.payload;
        // console.log("AadharValidation",action.payload);
      });
      builder.addMatcher(isAnyOf(getAadharValidation.rejected), (state, action) => {
        state.loading = false;
      });




      builder.addMatcher(isAnyOf(otpValidation.pending), state => {
        state.otpLoading = true;
      });
      builder.addMatcher(isAnyOf(otpValidation.fulfilled), (state, action) => {
        state.otpLoading = false;
        state.verifyOtpResult = action.payload;
        console.log("otpValidation",action.payload);
      });
      builder.addMatcher(isAnyOf(otpValidation.rejected), (state, action) => {
        state.otpLoading = false;
      });

    },
  });
  
  export default aadharValidationSlice.reducer;
  
  export const getAadharValidation = createAsyncThunk(
    'mobile/getAadharValidation',
    async (payload, toolkit) => {
      return await AxiosClient(
        'POST',
        `api/Kyc/ValidateAdhaar`,
        payload,
        toolkit,
      );
    },
  );

  export const otpValidation = createAsyncThunk(
    'mobile/otpValidation',
    async (payload, toolkit) => {
      return await AxiosClient(
        'POST',
        `api/Kyc/VerifyOtp`,
        payload,
        toolkit,
      );
    },
  );