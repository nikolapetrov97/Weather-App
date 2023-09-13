import {
  Autocomplete,
  Drawer,
  Grid,
  IconButton,
  Popper,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../../../store/store";
import { useEffect, useRef, useState } from "react";
import { ArrowBack, Search } from "@mui/icons-material";
import {
  getLocations,
  setCurrentLocation,
  setSearchLocations,
} from "../../../../../slices/weather";
import { LocationResponse } from "../../../../../utils/interfaces";

const SearchBarMobile = () => {
  const dispatch = useDispatch();
  const currentLocations = useSelector(
    (state: ApplicationState) => state?.weather?.searchLocations
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState<string>();
  const inputRef: any = useRef();

  const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpenModal(false);
      inputRef.current.blur();
    }
  };

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (open === false) {
      // do smth
    }
    setIsOpenModal(open);
  };

  const PopperMy = function (props: any) {
    return (
      <Popper
        {...props}
        style={{ width: "100%", height: "100%" }}
        placement="bottom-start"
      />
    );
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        if (inputValue) {
          dispatch(getLocations(inputValue));
        } else {
          dispatch(setSearchLocations([]));
        }
      } catch (error) {
        console.log(error);
      }
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue, dispatch]);

  return !isOpenModal ? (
    <IconButton
      onMouseDown={() => {
        setIsOpenModal(true);
      }}
      size="small"
    >
      <Search />
    </IconButton>
  ) : (
    <Drawer
      anchor="top"
      open={isOpenModal}
      onClose={toggleDrawer(false)}
      className="drawer"
      transitionDuration={700}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        role="presentation"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
        sx={{ padding: "20px 20px 20px 20px" }}
      >
        <Grid item xs={1} sx={{ paddingTop: "10px", paddingRight: "6px" }}>
          <ArrowBack onClick={() => setIsOpenModal(false)} />
        </Grid>
        <Grid item xs={11} sx={{ paddingLeft: "10px" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Autocomplete
              fullWidth
              PopperComponent={PopperMy}
              ListboxProps={{ style: { maxHeight: "15rem" } }}
              freeSolo
              id="combo-box-demo"
              inputValue={inputValue || ""}
              value={null}
              options={currentLocations || []}
              getOptionLabel={(option) => {
                const location = option as LocationResponse;
                return `${location?.LocalizedName}, ${location?.AdministrativeArea?.ID}, ${location?.Country?.LocalizedName}`;
              }}
              onChange={(e, newValue) => {
                const newLocation = newValue as LocationResponse;
                dispatch(
                  setCurrentLocation({
                    city: newLocation?.LocalizedName,
                    country: newLocation?.Country?.ID,
                    key: newLocation?.Key,
                    region: newLocation?.AdministrativeArea?.LocalizedName,
                  })
                );
                setIsOpenModal(false);
                if (newLocation?.LocalizedName) {
                  setInputValue(newLocation?.LocalizedName);
                }
              }}
              onInputChange={(_e, newValue, reason) => {
                if (reason === "clear") {
                  setInputValue("");
                  return;
                }
                setInputValue(newValue?.toString());
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  onKeyDown={keyPress}
                  inputRef={inputRef}
                  placeholder={"Location..."}
                  variant="outlined"
                  sx={{
                    "& > div.MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']":
                      {
                        paddingRight: "9px",
                        borderRadius: "25px",
                        "& button": {
                          order: 3,
                        },
                        "& > div.MuiAutocomplete-endAdornment": {
                          position: "relative",
                          order: 2,
                        },
                      },
                    "& .MuiInputBase-root": {
                      background: "#f6f6f6",
                      color: "#000",
                    },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default SearchBarMobile;
