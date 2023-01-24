import { configureStore } from '@reduxjs/toolkit';
import storyScrollReducer from './slice';

export default configureStore({
  reducer: {
    storyScroll: storyScrollReducer,
  },
});
