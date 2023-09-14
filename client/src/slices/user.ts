import { createSlice } from "@reduxjs/toolkit";
import { FavoritePlace } from "../utils/interfaces";

export interface UserState {
  favorites: FavoritePlace[];
}

const initialState: UserState = {
  favorites: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToFavorites(
      state,
      { payload }: { payload: { place: FavoritePlace | undefined } }
    ) {
      state.favorites = payload?.place
        ? [...state.favorites, payload?.place]
        : [...state.favorites];
    },
    removeFromFavorites(
      state,
      { payload }: { payload: { key: string | undefined } }
    ) {
      state.favorites = state.favorites?.filter(
        (fav) => fav?.location?.key !== payload.key
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = userSlice.actions;
export default userSlice.reducer;
