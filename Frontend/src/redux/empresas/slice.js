import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { empresaGetAllFetch, empresaAddFetch, empresaQuitarFetch } from "../fetchs";

// Thunks
export const getEmpresas = createAsyncThunk(
    "empresas/getEmpresas",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.autorizacion?.usuario?.Profiles?.[0]?.Token || "";
        try {
            const data = await empresaGetAllFetch.get("", token);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addEmpresa = createAsyncThunk(
    "empresas/addEmpresa",
    async (body, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.autorizacion?.usuario?.Profiles?.[0]?.Token || "";
        try {
            const data = await empresaAddFetch.post(body, token);
            // After adding, we might want to refresh the list, we can dispatch getEmpresas
            thunkAPI.dispatch(getEmpresas());
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteEmpresa = createAsyncThunk(
    "empresas/deleteEmpresa",
    async (id, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.autorizacion?.usuario?.Profiles?.[0]?.Token || "";
        try {
            const data = await empresaQuitarFetch.delete(id, token);
            // Refresh list
            thunkAPI.dispatch(getEmpresas());
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const empresasSlice = createSlice({
    name: "empresas",
    initialState: {
        entities: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmpresas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmpresas.fulfilled, (state, action) => {
                state.loading = false;
                state.entities = action.payload || [];
            })
            .addCase(getEmpresas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addEmpresa.pending, (state) => {
                state.loading = true;
            })
            .addCase(addEmpresa.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addEmpresa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteEmpresa.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteEmpresa.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteEmpresa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default empresasSlice.reducer;
