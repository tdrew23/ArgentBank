import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers'; //

// Créez le store avec un seul reducer
const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store;
