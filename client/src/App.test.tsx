import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const renderTestedComponent = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

test("renders learn react link", () => {
  renderTestedComponent();
  const linkElement = screen.getAllByText("Favorites")[0];
  expect(linkElement).toBeInTheDocument();
});
