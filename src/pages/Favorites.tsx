import { useSelector } from "react-redux";
import { ApplicationState } from "../store/store";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";
import { Box, Typography } from "@mui/material";

const Favorites = () => {
  const favorites = useSelector(
    (state: ApplicationState) => state?.user?.favorites
  );
  return (
    <>
      {favorites && favorites?.length > 0 ? (
        <>
          <Typography mt={2} textAlign="center" variant="h3" fontWeight={500}>
            My Favorite Locations
          </Typography>
          {favorites?.map((fav) => (
            <Box sx={{ my: 2, width: "100%" }} key={fav?.location?.key}>
              <FavoriteCard favorite={fav} />
            </Box>
          ))}
        </>
      ) : (
        <Typography mt={3} variant="h5" textAlign="center">
          No Favorites
        </Typography>
      )}
    </>
  );
};

export default Favorites;
