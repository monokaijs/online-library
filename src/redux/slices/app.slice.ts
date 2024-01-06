import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AppSliceState {
  appLoading: boolean;
  theme: 'light' | 'dark';
  bookQuickViewOpened: boolean;
}

const initialState: AppSliceState = {
  appLoading: true,
  theme: 'light',
  bookQuickViewOpened: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setBookQuickViewOpened(state, action: PayloadAction<boolean>) {
      state.bookQuickViewOpened = action.payload;
    }
  },
  extraReducers: (builder) => {

  }
});

export const {
  setBookQuickViewOpened,
} = appSlice.actions;
