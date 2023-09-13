import { createSlice } from "@reduxjs/toolkit";
import {
  get1DayForecastApi,
  get5DayForecastApi,
  getLocationApi,
} from "../utils/api";
import {
  Location,
  ForecastResponse,
  LocationResponse,
} from "../utils/interfaces";
import Toasts from "../utils/globalHandlers/Toasts";
import { endSpinnerAction, startSpinnerAction } from "./globalEvents";

export interface WeatherState {
  currentLocation: Location;
  searchLocations?: LocationResponse[];
  currentForecast?: ForecastResponse;
}

const initialState: WeatherState = {
  currentLocation: {
    key: "328328",
    country: "GB",
    region: "London",
    city: "London",
  }, // LONDON
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSearchLocations(state, action) {
      state.searchLocations = action.payload;
    },
    setCurrentLocation(state, { payload }: { payload: Location }) {
      state.currentLocation = payload;
    },
    setForecast(state, action) {
      state.currentForecast = action.payload;
    },
  },
});

export const { setForecast, setCurrentLocation, setSearchLocations } =
  weatherSlice.actions;
export default weatherSlice.reducer;

export const getLocations = (searchString: string): any => {
  return async (dispatch: any) => {
    getLocationApi(searchString).then(async (res) => {
      const locations: LocationResponse[] = await res.json();
      dispatch(setSearchLocations(locations));
    });
  };
};

export const get1DayForecast = (
  locationKey: string,
  measuringUnit: string
): any => {
  return async (dispatch: any) => {
    dispatch(startSpinnerAction());
    const isCelsiumMetrics = measuringUnit === "celsium";
    get1DayForecastApi(locationKey, isCelsiumMetrics)
      .then(async (res) => {
        const forecast: ForecastResponse = await res.json();
        dispatch(setForecast(forecast));
      })
      .catch((e) => Toasts.error(e))
      .finally(() => dispatch(endSpinnerAction()));
  };
};

export const get5DayForecast = (
  locationKey: string,
  measuringUnit: string
): any => {
  return async (dispatch: any) => {
    dispatch(startSpinnerAction());
    const isCelsiumMetrics = measuringUnit === "celsium";
    get5DayForecastApi(locationKey, isCelsiumMetrics)
      .then(async (res) => {
        const forecast: ForecastResponse[] = await res.json();
        dispatch(setForecast(forecast));
      })
      .catch((e) => Toasts.error(e))
      .finally(() => dispatch(endSpinnerAction()));
  };
};
