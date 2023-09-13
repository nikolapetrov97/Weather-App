import { useMediaQuery } from "@mui/material";
import SearchBarMobile from "./components/SearchBarMobile";
import SearchBarDesktop from "./components/SearchBarDesktop";

const SearchBar = () => {
  const mobile = useMediaQuery("(max-width: 600px)");

  return mobile ? <SearchBarMobile /> : <SearchBarDesktop />;
};

export default SearchBar;
