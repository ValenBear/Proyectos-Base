import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        spinner: { loading: 0 },
        error: { message: "", timestamp: null },
        media: { size: "large", orientation: "landscape", timeStamp: null },
        menu: { timeStamp: null, option: "" },
        alert: { timeStamp: null, titulo: null, mensaje: null },
        confirm: { timeStamp: null, titulo: null, mensaje: null, onOk: null, onCancel: null },
        loginOk: false,
        steps: { step: 1 },
    },
    reducers: {
        showSpinner: (state) => { state.spinner.loading += 1; },
        hideSpinner: (state) => { state.spinner.loading -= 1; },
        showError: (state, action) => {
            state.error.timestamp = Date.now();
            state.error.message = action.payload;
        },
        hideError: (state) => {
            state.error.timestamp = Date.now();
            state.error.message = null;
        },
        setMedia: (state, action) => {
            state.media.size = action.payload;
            state.media.timeStamp = Date.now();
        },
        setMediaOrientation: (state, action) => {
            state.media.orientation = action.payload;
            state.media.timeStamp = Date.now();
        },
        selection: (state, action) => {
            state.menu.timeStamp = Date.now();
            state.menu.option = action.payload;
        },
        showAlert: {
            reducer: (state, action) => {
                state.alert.timeStamp = Date.now();
                state.alert.titulo = action.payload.titulo;
                state.alert.mensaje = action.payload.mensaje;
            },
            prepare: (titulo = "Atencion", mensaje = "Sin mensaje") => ({ payload: { titulo, mensaje } })
        },
        showConfirm: {
            reducer: (state, action) => {
                state.confirm.timeStamp = Date.now();
                state.confirm.titulo = action.payload.titulo;
                state.confirm.mensaje = action.payload.mensaje;
                state.confirm.onOk = action.payload.onOk;
                state.confirm.onCancel = action.payload.onCancel;
            },
            prepare: (titulo = "Atencion", mensaje = "Sin mensaje", onOk = null, onCancel = null) => ({ payload: { titulo, mensaje, onOk, onCancel } })
        },
        setStep: (state, action) => { state.steps.step = action.payload; }
    }
});

export const { showSpinner, hideSpinner, showError, hideError, setMedia, setMediaOrientation, selection, showAlert, showConfirm, setStep } = uiSlice.actions;
export default uiSlice.reducer;
