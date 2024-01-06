import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AppSliceState {
  appLoading: boolean;
  theme: 'light' | 'dark';
  quickView: {
    opened: boolean;
    selectedBook?: any;
  };
}

const initialState: AppSliceState = {
  appLoading: true,
  theme: 'light',
  quickView: {
    opened: false,
  }
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setQuickView(state, action: PayloadAction<AppSliceState['quickView']>) {
      state.quickView = action.payload;
    }
  },
  extraReducers: (builder) => {

  }
});

export const {
  setQuickView,
} = appSlice.actions;
