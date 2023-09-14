import { createSlice } from "@reduxjs/toolkit";

export interface GlobalEventsState {
  pendingTasks: number;
  themeMode: "dark" | "light";
  measuringUnit: "fahrenheit" | "celsium";
}

const initialState: GlobalEventsState = {
  pendingTasks: 0,
  themeMode: "dark",
  measuringUnit: "celsium",
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
    changeUnit(state) {
      state.measuringUnit =
        state.measuringUnit === "fahrenheit" ? "celsium" : "fahrenheit";
    },
  },
});

export const {
  startSpinnerAction,
  endSpinnerAction,
  changeThemeMode,
  changeUnit,
} = globalEventsSlice.actions;
export default globalEventsSlice.reducer;

export const changeTheme = (): any => {
  return async (dispatch: any) => {
    return dispatch(changeThemeMode());
  };
};

export const changeMeasuringUnit = (): any => {
  return async (dispatch: any) => {
    return dispatch(changeUnit());
  };
};
