import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import FavoriteCard from "./FavoriteCard";
import configureMockStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { setCurrentLocation } from "../../slices/weather";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const store = mockStore({});
store.dispatch = jest.fn();

const mockFavorite = {
  key: "1",
  city: "Sample City",
  region: "Sample Region",
  country: "Sample Country",
};

const renderTestedComponent = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <FavoriteCard favorite={mockFavorite} />
      </BrowserRouter>
    </Provider>
  );
};

describe("FavoriteCard Component", () => {
  it("renders with the provided favorite location", () => {
    const { getByText } = renderTestedComponent();
    expect(
      getByText(
        `Current Weather - ${mockFavorite.city} ${mockFavorite.region} ${mockFavorite.country}`
      )
    ).toBeInTheDocument();
  });

  test("dispatches setCurrentLocation when More Details button is clicked", () => {
    const { getByText } = renderTestedComponent();
    const detailsButton = getByText("More Details");
    fireEvent.click(detailsButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      setCurrentLocation(mockFavorite)
    );
  });
});
