import { createSlice } from "@reduxjs/toolkit";

export interface GlobalEventsState {
  pendingTasks: number;
  themeMode: "dark" | "light";
}

const initialState: GlobalEventsState = {
  pendingTasks: 0,
  themeMode: "dark",
};

export const globalEventsSlice = createSlice({
  name: "globalEvents",
  initialState,
  reducers: {
    startSpinnerAction(state) {
      state.pendingTasks = state.pendingTasks += 1;
    },
    endSpinnerAction(state) {
      state.pendingTasks = state.pendingTasks -= 1;
    },
    changeThemeMode(state) {
      state.themeMode = state.themeMode === "dark" ? "light" : "dark";
    },
  },
});

export const { startSpinnerAction, endSpinnerAction, changeThemeMode } =
  globalEventsSlice.actions;
export default globalEventsSlice.reducer;

export const changeTheme = (): any => {
  return async (dispatch: any) => {
    return dispatch(changeThemeMode());
  };
};
