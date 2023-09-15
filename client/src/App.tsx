import "./App.css";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./utils/themes";
import { ApplicationState } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import LandingPage from "./pages/LandingPage";
import Favorites from "./pages/Favorites";
import { useEffect } from "react";
import { getUser } from "./slices/user";

function App() {
  const dispatch = useDispatch();
  const themeMode = useSelector(
    (state: ApplicationState) => state?.globalEvents?.themeMode
  );

  useEffect(() => {
    dispatch(getUser("65039ca03a60d0cafa398bb9"));
  }, [dispatch]);

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="weather" element={<LandingPage />} />
          <Route path="favorites" element={<Favorites />} />
          {/* Catch-all for URLs that we don't have explicit routes for. */}
          <Route path="*" element={<h1>NO MATCH</h1>} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
