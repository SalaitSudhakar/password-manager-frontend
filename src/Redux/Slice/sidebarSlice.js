import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  isSmallScreenSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleSmallScreenSidebar: (state) => {
      state.isSmallScreenSidebarOpen = !state.isSmallScreenSidebarOpen;
    }
  },
});

export const { toggleSidebar, toggleSmallScreenSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
