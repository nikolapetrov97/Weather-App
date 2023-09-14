import { configureStore } from "@reduxjs/toolkit";
import { globalEventsSlice, GlobalEventsState } from "../slices/globalEvents";
import { weatherSlice, WeatherState } from "../slices/weather";
import { userSlice, UserState } from "../slices/user";

export interface ApplicationState {
  globalEvents: GlobalEventsState;
  weather: WeatherState;
  user: UserState;
}

export const store = configureStore({
  reducer: {
    [globalEventsSlice.name]: globalEventsSlice.reducer,
    [weatherSlice.name]: weatherSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

const makeStore = () => store;

export const wrapper = makeStore;
