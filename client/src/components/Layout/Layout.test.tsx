import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import Layout from "./Layout";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const store = mockStore({});
store.dispatch = jest.fn();

const renderTestedComponent = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
};

describe("Layout Component", () => {
  it("renders with the search bar", () => {
    const { getByPlaceholderText } = renderTestedComponent();
    expect(getByPlaceholderText("Search location...")).toBeInTheDocument();
  });

  it("handles theme mode change", () => {
    const { getByTestId } = renderTestedComponent();
    const themeModeButton = getByTestId("theme-button");
    fireEvent.click(themeModeButton);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
