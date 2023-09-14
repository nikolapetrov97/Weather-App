import { Grid, Typography, Divider } from "@mui/material";
import { DailyForecast } from "../../../utils/interfaces";

type Props = {
  forecast: DailyForecast;
};

const AdditionalForecastInfo = ({ forecast }: Props) => {
  const renderInfoRow = (text: string, value: string | undefined) => (
    <Grid container justifyContent="space-between">
      <Typography>{text}</Typography>
      <Typography>{value}</Typography>
      <Grid item xs={12}>
        <Divider sx={{ my: 1.5 }} />
      </Grid>
    </Grid>
  );
  return (
    <>
      {renderInfoRow(
        "RealFeel Shade:",
        `${forecast?.RealFeelTemperatureShade?.Maximum?.Value} ${forecast?.RealFeelTemperatureShade?.Minimum?.Unit}`
      )}
      {renderInfoRow(
        "Air quality:",
        forecast?.AirAndPollen?.find((data) => data?.Name === "AirQuality")
          ?.Category
      )}
      {renderInfoRow(
        "Wind:",
        `${forecast?.Day?.Wind?.Speed?.Value} ${forecast?.Day?.Wind?.Speed?.Unit}`
      )}
      {renderInfoRow(
        "Wind Gusts:",
        `${forecast?.Day?.WindGust?.Speed?.Value} ${forecast?.Day?.WindGust?.Speed?.Unit}`
      )}
    </>
  );
};

export default AdditionalForecastInfo;
