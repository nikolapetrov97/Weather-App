import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { FavoritePlace } from "../../utils/interfaces";
import { styled } from "@mui/material/styles";
import WeatherLoader from "../../utils/lotties/weather-loader.json";
import Lottie from "lottie-react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeFromFavorites } from "../../slices/user";
import { useNavigate } from "react-router-dom";
import { setCurrentLocation } from "../../slices/weather";

type Props = {
  favorite: FavoritePlace;
};

const PaperContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: "100vw",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "85vw",
    margin: "0 auto",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "70vw",
    margin: "0 auto",
  },
}));

const FavoriteCard = ({ favorite }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = useCallback(
    () => dispatch(removeFromFavorites({ key: favorite?.location?.key })),
    [dispatch, favorite?.location?.key]
  );

  const handleMoreDetails = useCallback(() => {
    dispatch(setCurrentLocation(favorite?.location));
    navigate("/");
  }, [dispatch, favorite?.location, navigate]);

  return (
    <PaperContainer>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={7} lg={8} p={2}>
          <Typography variant="h5" fontWeight="bold">
            Current Weather - {favorite?.location?.city}{" "}
            {favorite?.location?.region} {favorite?.location?.country}
          </Typography>
          <Typography variant="h6">
            {favorite?.weather?.Day?.IconPhrase}
          </Typography>
          <Grid container justifyContent="flex-start">
            <Lottie
              style={{ height: "150px", width: "150px" }}
              animationData={WeatherLoader}
              loop={true}
            />
            <Box>
              <Typography
                sx={{ fontSize: { xs: "1rem", md: "2.5rem", lg: "4rem" } }}
                fontWeight="bold"
              >
                {favorite?.weather?.Temperature?.Maximum?.Value}{" "}
                {favorite?.weather?.Temperature?.Maximum?.Unit}
              </Typography>
              <Typography variant="h6">
                RealFeel:{" "}
                {favorite?.weather?.RealFeelTemperature?.Maximum?.Value}{" "}
                {favorite?.weather?.RealFeelTemperature?.Minimum?.Unit}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} lg={4} p={2}>
          <Button
            sx={{ width: { xs: "90%", md: "unset" } }}
            color="inherit"
            variant="contained"
            onClick={handleRemoveFromFavorites}
          >
            Remove from favorites
          </Button>
          <Button
            sx={{ mt: 2, width: { xs: "90%", md: "unset" } }}
            color="inherit"
            variant="contained"
            onClick={handleMoreDetails}
          >
            More Details
          </Button>
        </Grid>
      </Grid>
    </PaperContainer>
  );
};

export default FavoriteCard;
