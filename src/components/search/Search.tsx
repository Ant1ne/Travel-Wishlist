import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from "react-redux"

import { AppDispatch, RootState } from "../../redux/store";
import { actions } from "../../redux/slice/countries";
import { fetchCountryData } from '../../redux/thunk/countries';

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';


export default function Search() {
  // get state
  const countryList = useSelector(
    (state: RootState) => state.country.countries);

  // set state
  const [userInput, setUserInput] = useState("");

  // search function onChange
  const dispatch = useDispatch<AppDispatch>();
  const userInputSearch = (name: string) => {
    const result = countryList.filter((country) =>
    country.name.common.toLocaleLowerCase()
    .includes(userInput.toLocaleLowerCase()));

    // filter country list
    dispatch(actions.getCountryList(result))
  }
  // search handled change
  const userInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    userInputSearch(userInput);
  }

  // delete input
  useEffect(() => {
    if (userInput === "") {
      dispatch(fetchCountryData());
    }
  }, [dispatch, userInput])

  return (
    <div className="search-div">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          marginTop: '10px',
          marginBottom: '10px'
        }}
        noValidate
        autoComplete="off"
      >
        <Tooltip title="Search country's name">
          <TextField
            id="standard-search"
            label="Please search country's name"
            type="search"
            variant="standard"
            value={userInput}
            onChange={userInputHandler}
          />
        </Tooltip>

      </Box>
    </div>
  )
}
