import { createSlice } from "@reduxjs/toolkit";

export const autorizacionSlice = createSlice({
    name: "autorizacion",
    initialState: { usuario: null, logeado: false, timeStamp: null, errorTimeStamp: null },
    reducers: {
        loginSuccess: (state, action) => {
            state.timeStamp = Date.now();
            state.logeado = true;
            state.usuario = action.payload;
        },
        loginError: (state) => {
            state.errorTimeStamp = Date.now();
            state.logeado = false;
        },
        logout: (state) => {
            state.timeStamp = Date.now();
            state.logeado = false;
            state.usuario = null;
        }
    }
});

export const { loginSuccess, loginError, logout } = autorizacionSlice.actions;
export default autorizacionSlice.reducer;
