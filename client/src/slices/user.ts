import { createSlice } from "@reduxjs/toolkit";
import { Location } from "../utils/interfaces";
import {
  addToFavoritesApi,
  getUserApi,
  removeFromFavoritesApi,
  updateUserApi,
} from "../utils/api";
import { MEASUREMNT_TYPES } from "../utils/enums";
import Toasts from "../utils/globalHandlers/Toasts";

export interface UserState {
  id?: string | number;
  favorites: Location[];
  settings?: {
    measurement: MEASUREMNT_TYPES.FAHRENHEIT | MEASUREMNT_TYPES.CELSIUM;
  };
}

const initialState: UserState = {
  favorites: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      {
        payload,
      }: {
        payload: UserState & { _id?: string };
      }
    ) {
      state.favorites = payload?.favorites;
      state.id = payload?._id;
      state.settings = payload?.settings;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const getUser = (id: string | number): any => {
  return async (dispatch: any) => {
    getUserApi(id).then(async (res) => {
      const { user }: { user: UserState } = await res.json();
      dispatch(setUser(user));
    });
  };
};

export const addToFavorites = (
  id: string | number | undefined,
  location: Location
): any => {
  return async (dispatch: any) => {
    if (!id || !location) return;
    addToFavoritesApi(id, location).then(async (res) => {
      const { user }: { user: UserState } = await res.json();
      dispatch(setUser(user));
      Toasts.success("Successfully added to favorites");
    });
  };
};

export const removeFromFavorites = (
  id: string | number | undefined,
  key?: string
): any => {
  return async (dispatch: any) => {
    if (!id || !key) return;
    removeFromFavoritesApi(id, key).then(async (res) => {
      const { user }: { user: UserState } = await res.json();
      dispatch(setUser(user));
    });
  };
};

export const switchUserMeasurement = (id: string | number | undefined): any => {
  return async (dispatch: any) => {
    const res = await getUserApi(id);
    const { user } = await res.json();
    const currentMeasurement = user?.settings?.measurement;
    const newMeasurement =
      currentMeasurement === MEASUREMNT_TYPES.FAHRENHEIT
        ? MEASUREMNT_TYPES.CELSIUM
        : MEASUREMNT_TYPES.FAHRENHEIT;
    updateUserApi(id, {
      settings: { measurement: newMeasurement },
    }).then(async (res) => {
      const { user }: { user: UserState } = await res.json();
      dispatch(setUser(user));
    });
  };
};
