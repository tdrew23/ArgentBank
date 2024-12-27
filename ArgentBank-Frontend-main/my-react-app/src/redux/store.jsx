import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers'; // Assurez-vous que le chemin d'importation est correct

// Créez le store avec un seul reducer
const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store;
