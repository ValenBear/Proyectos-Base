import { createSlice } from "@reduxjs/toolkit";

export const miPerfilSlice = createSlice({
    name: "miPerfil",
    initialState: { entities: null, timeStamp: null },
    reducers: {
        setPerfil: (state, action) => {
            state.timeStamp = Date.now();
            state.entities = action.payload;
        }
    }
});

export const { setPerfil } = miPerfilSlice.actions;
export default miPerfilSlice.reducer;
