import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get1DayForecast,
  get5DayForecast,
  getLocationByGeolocation,
} from "../slices/weather";
import { ApplicationState } from "../store/store";
import ForecastCard from "../components/ForecastCard/ForecastCard";
import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { removeFromFavorites, addToFavorites } from "../slices/user";
import Toasts from "../utils/globalHandlers/Toasts";
import { config } from "../utils/config";

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTabs = styled(Tabs)(() => ({
  "& .MuiTab-root.Mui-selected": {
    color: "#000",
  },
  "& .MuiTab-root": {
    color: "#919191",
  },
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  width: "90vw",
}));

const LandingPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: ApplicationState) => state?.user?.favorites
  );
  const currentLocation = useSelector(
    (state: ApplicationState) => state?.weather?.currentLocation
  );
  const measuringUnit = useSelector(
    (state: ApplicationState) => state?.globalEvents?.measuringUnit
  );
  const currentForecast = useSelector(
    (state: ApplicationState) => state?.weather?.currentForecast
  );
  const [tabIndex, setTabIndex] = useState<number>(0);

  const isLocationAFavorite = useMemo(
    () => favorites?.find((fav) => fav?.location?.key === currentLocation?.key),
    [currentLocation, favorites]
  );

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleAddRemoveFavorite = () => {
    if (isLocationAFavorite) {
      dispatch(removeFromFavorites({ key: currentLocation?.key }));
      Toasts.success("Removed from favorites");
    } else {
      if (currentForecast && currentForecast?.DailyForecasts?.length > 0) {
        dispatch(
          addToFavorites({
            place: {
              location: currentLocation,
              weather: currentForecast?.DailyForecasts[0],
            },
          })
        );
        Toasts.success("Successfully added to favorites");
      }
    }
  };

  useEffect(() => {
    if (currentLocation?.key && measuringUnit) {
      if (tabIndex === 0) {
        dispatch(get1DayForecast(currentLocation.key, measuringUnit));
      } else if (tabIndex === 1) {
        dispatch(get5DayForecast(currentLocation.key, measuringUnit));
      }
    } else if (!currentLocation && measuringUnit) {
      dispatch(getLocationByGeolocation(config.DEFAULT_LOCATION_LAT_LON));
    }
  }, [currentLocation, measuringUnit, tabIndex, dispatch]);

  return (
    <Grid container alignItems="center" direction="column">
      <CustomPaper>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          px={5}
        >
          <Typography
            textAlign="center"
            sx={{
              fontSize: { xs: "1.5rem", md: "3rem" },
              mb: { xs: 1, sm: 0 },
            }}
          >
            {currentLocation?.city}, {currentLocation?.region},{" "}
            {currentLocation?.country}
          </Typography>
          <Button
            onClick={handleAddRemoveFavorite}
            color="inherit"
            variant="contained"
          >
            {isLocationAFavorite ? "Remove to favorites" : "Add to favorites"}
          </Button>
        </Grid>
      </CustomPaper>
      <CustomTabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab
          sx={{ fontWeight: "bold" }}
          color="inherit"
          label={"1 Day Forecast"}
          {...a11yProps(0)}
        />

        <Tab
          color="inherit"
          sx={{ fontWeight: "bold" }}
          label={"5 Day Forecast"}
          {...a11yProps(1)}
        />
      </CustomTabs>
      {currentForecast?.DailyForecasts &&
      currentForecast?.DailyForecasts?.length > 0
        ? currentForecast?.DailyForecasts?.map((forecast) => (
            <Box sx={{ my: 2, width: "100%" }} key={forecast?.Date}>
              <ForecastCard
                forecast={forecast}
                currentLocation={currentLocation}
              />
            </Box>
          ))
        : null}
    </Grid>
  );
};

export default LandingPage;
