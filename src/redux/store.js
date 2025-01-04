import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// Slices
import { authSlice } from './slices/auth/authSlice'
import { reportSlice } from './slices/reports/reportSlice';

const reducers = combineReducers({
  auth: authSlice.reducer,
  reports: reportSlice.reducer,
})

const rootPersistConfig = {
  key:'root',
  storage,
}

const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});