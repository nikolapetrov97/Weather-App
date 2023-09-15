import { Button, Grid, Paper, Typography } from "@mui/material";
import { Location } from "../../utils/interfaces";
import { styled } from "@mui/material/styles";
import WeatherLoader from "../../utils/lotties/weather-loader.json";
import Lottie from "lottie-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../../slices/user";
import { useNavigate } from "react-router-dom";
import { setCurrentLocation } from "../../slices/weather";
import { ApplicationState } from "../../store/store";

type Props = {
  favorite: Location;
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
  const userState = useSelector((state: ApplicationState) => state?.user);

  const handleRemoveFromFavorites = useCallback(
    () => dispatch(removeFromFavorites(userState?.id, favorite?.key)),
    [dispatch, favorite?.key, userState?.id]
  );

  const handleMoreDetails = useCallback(() => {
    dispatch(setCurrentLocation(favorite));
    navigate("/");
  }, [dispatch, favorite, navigate]);

  return (
    <PaperContainer>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={7} lg={8} p={2}>
          <Typography variant="h5" fontWeight="bold">
            Current Weather - {favorite?.city} {favorite?.region}{" "}
            {favorite?.country}
          </Typography>
          <Grid container justifyContent="flex-start">
            <Lottie
              style={{ height: "150px", width: "150px" }}
              animationData={WeatherLoader}
              loop={true}
            />
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
