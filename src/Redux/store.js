import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./Slice/sidebarSlice.js";
import userReducer from "./Slice/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  sidebar: sidebarReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["sidebar"], // Don't persist this reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);