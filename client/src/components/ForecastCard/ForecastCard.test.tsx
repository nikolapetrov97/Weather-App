import { render } from "@testing-library/react";
import ForecastCard from "./ForecastCard";
import { mock1DayForecast } from "../../utils/mockData";
import { DailyForecast } from "../../utils/interfaces";

const mockLocation = {
  city: "Sample City",
  region: "Sample Region",
  country: "Sample Country",
};

const mockedForecast = mock1DayForecast?.DailyForecasts[0] as DailyForecast;

describe("ForecastCard Component", () => {
  it("renders with the provided forecast and location", () => {
    const { getByText } = render(
      <ForecastCard forecast={mockedForecast} currentLocation={mockLocation} />
    );
    expect(
      getByText(
        `Current Weather - ${mockLocation.city}, ${mockLocation.region}, ${mockLocation.country}`
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        `${mockedForecast.Day.IconPhrase} - ${new Date(
          mockedForecast.Date
        ).toDateString()}`
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        `${mockedForecast.Temperature.Maximum.Value} ${mockedForecast.Temperature.Maximum.Unit}`
      )
    ).toBeInTheDocument();
  });
});
