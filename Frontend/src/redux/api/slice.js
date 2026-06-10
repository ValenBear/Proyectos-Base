import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Ejemplo de AsyncThunk estándar moderno para reemplazo de la API nativa de Middleware
export const fetchApi = createAsyncThunk(
    "api/fetchApi",
    async ({ fetchFunction, params }, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.autorizacion?.usuario?.Profiles?.[0]?.Token || "";
        try {
            // Ejemplo de llamada generica a ODataFetch
            params.token = token;
            const response = await fetchFunction(params);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const apiSlice = createSlice({
    name: "api",
    initialState: {
        loading: 0,
        fetch: null,
        sentido: "",
    },
    reducers: {
        apiShowSpinner: (state, action) => {
            state.loading += 1;
            state.fetch = action.payload;
            state.sentido = "ida";
        },
        apiHideSpinner: (state, action) => {
            state.loading -= 1;
            state.fetch = action.payload;
            state.sentido = "vuelta";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApi.pending, (state) => {
                state.loading += 1;
                state.sentido = "ida";
            })
            .addCase(fetchApi.fulfilled, (state) => {
                state.loading -= 1;
                state.sentido = "vuelta";
            })
            .addCase(fetchApi.rejected, (state) => {
                state.loading -= 1;
                state.sentido = "vuelta";
            });
    }
});

export const { apiShowSpinner, apiHideSpinner } = apiSlice.actions;
export default apiSlice.reducer;
