import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store/store";
import { changeMeasuringUnit, changeTheme } from "../../slices/globalEvents";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Button, Container, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";

const StyledLogo = styled("img")(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledMobileLogo = styled("img")(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  width: "auto",
  height: "40px",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const pages = ["Weather", "Favorites"];

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeMode = useSelector(
    (state: ApplicationState) => state?.globalEvents?.themeMode
  );
  const measuringUnit = useSelector(
    (state: ApplicationState) => state?.globalEvents?.measuringUnit
  );
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenuAndReroute = (path?: string) => {
    setAnchorElNav(null);
    if (path) {
      navigate(`/${path?.toLowerCase()}`);
    }
  };

  const handleChangeThemeMode = () => dispatch(changeTheme());

  const handleChangeMeasuringUnit = () => dispatch(changeMeasuringUnit());

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <StyledLogo
              src="https://uptrend.bg/wp-content/uploads/2021/02/logo.svg"
              alt="ЪП ТРЕНД"
            />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenuAndReroute()}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => handleCloseNavMenuAndReroute(page)}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <StyledMobileLogo
                src="https://uptrend.bg/wp-content/uploads/2021/02/logo.svg"
                alt="ЪП ТРЕНД"
              />
            </Box>
            <Box
              sx={{ flexGrow: 1, ml: 3, display: { xs: "none", md: "flex" } }}
            >
              {pages.map((page) => (
                <Button
                  color="inherit"
                  key={page}
                  onClick={() => handleCloseNavMenuAndReroute(page)}
                  sx={{ my: 2, display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <IconButton
              sx={{ ml: 1 }}
              onClick={handleChangeMeasuringUnit}
              color="inherit"
            >
              {measuringUnit === "celsium" ? "C" : "F"}
            </IconButton>
            <IconButton
              sx={{ ml: 1 }}
              onClick={handleChangeThemeMode}
              color="inherit"
            >
              {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <SearchBar />
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Layout;
