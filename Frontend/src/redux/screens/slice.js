import { createSlice } from "@reduxjs/toolkit";
import { goTo } from "../routing/slice";
import { screenLayuts } from "./screenLayouts";

export const screensSlice = createSlice({
    name: "screens",
    initialState: {
        name: "main",
        layouts: screenLayuts["main"] || { small: { name: "", areas: [] }, medium: { name: "", areas: [] }, large: { name: "", areas: [] } },
        timeStamp: null
    },
    reducers: {
        showScreen: (state, action) => {
            state.timeStamp = Date.now();
            state.name = action.payload.name;
            state.layouts = action.payload.layouts;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(goTo, (state, action) => {
            const screenName = action.payload;
            state.timeStamp = Date.now();
            state.name = screenName;
            state.layouts = screenLayuts[screenName] || state.layouts;
        });
    }
});

export const { showScreen } = screensSlice.actions;
export default screensSlice.reducer;
