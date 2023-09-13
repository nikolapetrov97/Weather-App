import "./App.css";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./utils/themes";
import { ApplicationState } from "./store/store";
import { useSelector } from "react-redux";
import LandingPage from "./pages/LandingPage";
import Favorites from "./pages/Favorites";

function App() {
  const themeMode = useSelector(
    (state: ApplicationState) => state?.globalEvents?.themeMode
  );

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
