import { render } from "@testing-library/react";
import AdditionalForecastInfo from "./AdditionalForecastInfo";
import { DailyForecast } from "../../../utils/interfaces";
import { mock1DayForecast } from "../../../utils/mockData";

const mockedForecast = mock1DayForecast?.DailyForecasts[0] as DailyForecast;

describe("AdditionalForecastInfo Component", () => {
  it("renders with the provided forecast", () => {
    const { getByText } = render(
      <AdditionalForecastInfo forecast={mockedForecast} />
    );
    expect(
      getByText(
        `${mockedForecast?.RealFeelTemperatureShade?.Maximum?.Value} ${mockedForecast?.RealFeelTemperatureShade?.Minimum?.Unit}`
      )
    ).toBeInTheDocument();
    expect(
      getByText(`${mockedForecast.AirAndPollen[0].Category}`)
    ).toBeInTheDocument();
    expect(
      getByText(
        `${mockedForecast.Day.Wind.Speed.Value} ${mockedForecast.Day.Wind.Speed.Unit}`
      )
    ).toBeInTheDocument();
  });
});
