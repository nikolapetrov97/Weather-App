import { Autocomplete, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../../../store/store";
import { useEffect, useRef, useState } from "react";
import {
  getLocations,
  setCurrentLocation,
  setSearchLocations,
} from "../../../../../slices/weather";
import { styled } from "@mui/material/styles";

const PaperContainer = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.contrastText}`,
}));

const SearchBarDesktop = () => {
  const dispatch = useDispatch();
  const currentLocations = useSelector(
    (state: ApplicationState) => state?.weather?.searchLocations
  );
  const inputRef: any = useRef();
  const [inputValue, setInputValue] = useState<string>();

  const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      inputRef.current.blur();
    }
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

  return (
    <Autocomplete
      data-testid="services-autocomplete"
      sx={{ minWidth: { xs: "unset", sm: "200px" }, ml: { xs: 0, sm: 2 } }}
      id="combo-box-demo"
      options={currentLocations || []}
      getOptionLabel={(option) =>
        `${option?.LocalizedName}, ${option?.AdministrativeArea?.ID}, ${option?.Country?.LocalizedName}`
      }
      onChange={(e, newValue) => {
        dispatch(
          setCurrentLocation({
            city: newValue?.LocalizedName,
            country: newValue?.Country?.ID,
            key: newValue?.Key,
            region: newValue?.AdministrativeArea?.LocalizedName,
          })
        );
        if (newValue?.LocalizedName) {
          setInputValue(newValue?.LocalizedName);
        }
      }}
      onInputChange={(_e, newValue, reason) => {
        if (reason === "reset") {
          return;
        }
        setInputValue(newValue?.toString());
      }}
      renderInput={(params) => (
        <PaperContainer>
          <TextField
            {...params}
            focused
            inputRef={inputRef}
            onKeyDown={keyPress}
            size="small"
            value={inputValue}
            placeholder={"Search location..."}
            variant="outlined"
          />
        </PaperContainer>
      )}
    />
  );
};

export default SearchBarDesktop;
