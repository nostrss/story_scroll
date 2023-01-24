import { createSlice } from '@reduxjs/toolkit';

export const storyScrollSlice = createSlice({
  name: 'storyScroll',
  initialState: {
    authData: {
      uid: '',
      userEmail: '',
      displayName: '',
      isLogin: false,
    },
  },

  reducers: {
    getUserData: (state, data) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.authData.uid = data.payload.uid;
      state.authData.userEmail = data.payload.userEmail;
      state.authData.displayName = data.payload.displayName;
      if (
        data.payload.uid !== '' &&
        data.payload.userEmail !== '' &&
        data.payload.displayName !== ''
      ) {
        state.authData.isLogin = true;
      } else {
        state.authData.isLogin = false;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserData } = storyScrollSlice.actions;

export default storyScrollSlice.reducer;
