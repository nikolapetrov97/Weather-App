import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Location, DailyForecast } from "../../utils/interfaces";
import { styled } from "@mui/material/styles";
import WeatherLoader from "../../utils/lotties/weather-loader.json";
import Lottie from "lottie-react";
import AdditionalForecastInfo from "./components/AdditionalForecastInfo";
import { ExpandMore } from "@mui/icons-material";

type Props = {
  forecast: DailyForecast;
  currentLocation?: Location;
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

const DesktopAdditionalInfo = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: "100vw",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MobileAdditionalInfo = styled(Accordion)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: "100vw",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const ForecastCard = ({ forecast, currentLocation }: Props) => {
  return (
    <PaperContainer>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={7} lg={8} xl={3} p={2}>
          <Typography variant="h5" fontWeight="bold">
            Current Weather - {currentLocation?.city}, {currentLocation?.region}
            , {currentLocation?.country}
          </Typography>
          <Typography variant="h6">
            {forecast?.Day?.IconPhrase} -{" "}
            {new Date(forecast?.Date)?.toDateString()}
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
                {forecast?.Temperature?.Maximum?.Value}{" "}
                {forecast?.Temperature?.Maximum?.Unit}
              </Typography>
              <Typography variant="h6">
                RealFeel: {forecast?.RealFeelTemperature?.Maximum?.Value}{" "}
                {forecast?.RealFeelTemperature?.Minimum?.Unit}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} lg={4} xl={3} p={2}>
          <DesktopAdditionalInfo>
            <AdditionalForecastInfo forecast={forecast} />
          </DesktopAdditionalInfo>
          <MobileAdditionalInfo>
            <AccordionSummary expandIcon={<ExpandMore color="inherit" />}>
              <Typography fontWeight="bold">More Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AdditionalForecastInfo forecast={forecast} />
            </AccordionDetails>
          </MobileAdditionalInfo>
        </Grid>
      </Grid>
    </PaperContainer>
  );
};

export default ForecastCard;
