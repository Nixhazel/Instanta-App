import { createSlice } from "@reduxjs/toolkit";

export const alertsSlice = createSlice({
    name: 'alerts',
    initialState: {
        loading: false
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        }
    }
});
export const userSlice = createSlice({
    name: 'userData',
    initialState: {
        userInfo: {}
    },
    reducers: {
        user: (state, actions) => {
            state.userInfo = actions.payload;
        }
    }
});

export const { showLoading, hideLoading } = alertsSlice.actions;
export const { user } = userSlice.actions;