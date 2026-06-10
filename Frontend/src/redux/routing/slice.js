import { createSlice } from "@reduxjs/toolkit";

export const routingSlice = createSlice({
    name: "routing",
    initialState: { current: { pointer: 0, name: "main" }, history: [] },
    reducers: {
        setCurrent: (state, action) => { state.current = action.payload; },
        popHistory: (state) => { state.history.pop(); },
        pushHistory: (state, action) => {
            if (state.history[state.history.length - 1] !== action.payload) {
                state.history.push(action.payload);
            }
        },
        goTo: (state, action) => {
            const dest = action.payload;
            state.current = { pointer: 0, name: dest };
            if (state.history[state.history.length - 1] !== dest) {
                state.history.push(dest);
            }
            window.history.pushState(
                { option: dest, suboption: 1 },
                null,
                ""
            );
        }
    }
});

export const { setCurrent, popHistory, pushHistory, goTo } = routingSlice.actions;
export default routingSlice.reducer;
