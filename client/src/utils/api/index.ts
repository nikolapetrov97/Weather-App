import { config } from "../config";

//GET
export const getLocationApi = (searchString: string) =>
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCUWEATHER}&q=${searchString}`
  );

//GET
export const get1DayForecastApi = (locationKey: string, metric: boolean) =>
  fetch(
    `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${process.env.REACT_APP_ACCUWEATHER}&metric=${metric}&details=true`
  );

//GET
export const get5DayForecastApi = (locationKey: string, metric: boolean) =>
  fetch(
    `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_ACCUWEATHER}&metric=${metric}&details=true`
  );

//GET
export const getLocationByGeolocationApi = (
  latLonCommaSeparatedString: string
) =>
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_ACCUWEATHER}&q=${latLonCommaSeparatedString}`
  );

//GET
export const getUserApi = (id: string | number | undefined) =>
  fetch(`${config.SERVER_BASE_URL}/users/${id}`, { method: "GET" });

export const updateUserApi = (id: string | number | undefined, payload: any) =>
  fetch(`${config.SERVER_BASE_URL}/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const addToFavoritesApi = (
  id: string | number | undefined,
  payload: any
) =>
  fetch(`${config.SERVER_BASE_URL}/users/${id}/favorites`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const removeFromFavoritesApi = (
  id: string | number | undefined,
  locationToRemoveId: string | number | undefined
) =>
  fetch(
    `${config.SERVER_BASE_URL}/users/${id}/favorites/${locationToRemoveId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
