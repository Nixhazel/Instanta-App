import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { alertsSlice, userSlice } from "./slice";


const rootReducer = combineReducers({
	alerts: alertsSlice.reducer,
	userData: userSlice.reducer,
});

const store = configureStore({
	reducer: rootReducer
});

export default store;
