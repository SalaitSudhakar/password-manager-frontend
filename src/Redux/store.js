import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./Slice/sidebarSlice.js";
import userReducer from './Slice/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
   key: 'user',
   version: 1,
   storage,
   whitelist: ['user']  // only persist user reducer
}

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const rootReducer = combineReducers({
   user: persistedUserReducer,
   sidebar: sidebarReducer,
})

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
         serializableCheck: false,
      })
});

export const persistor = persistStore(store);
