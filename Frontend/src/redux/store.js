import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";

import autorizacionReducer from "./autorizacion/slice";
import uiReducer from "./ui/slice";
import apiReducer from "./api/slice";
import routingReducer from "./routing/slice";
import miPerfilReducer from "./miPerfil/slice";
import screensReducer from "./screens/slice";

export const store = configureStore({
    reducer: {
        autorizacion: autorizacionReducer,
        api: apiReducer,
        ui: uiReducer,
        screen: screensReducer,
        routing: routingReducer,
        miPerfil: miPerfilReducer,
    },
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: false,
        });

        if (process.env.NODE_ENV !== "production") {
            middlewares.push(logger);
        }
        return middlewares;
    },
    devTools: process.env.NODE_ENV !== "production",
});
