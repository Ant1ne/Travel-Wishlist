import { AppDispatch } from "../store"

import { actions } from "../slice/countries";

const url ="https://restcountries.com/v3.1/all"

// fetch all country list
export function fetchCountryData() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(url)
    const countryData = await response.json();

    if (countryData.length === 0 || countryData == null)
    {
      dispatch(actions.showLoading(true));
    }


    dispatch(actions.getCountryList(countryData));
  }
}

// fetch one country by name
export function fetchCountryItem (name: string | undefined) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`url/${name}`)
    const countryDetail = await response.json();

    if (countryDetail.length === 0 || countryDetail == null)
      {
        dispatch(actions.showLoading(true));
      }

    dispatch(actions.getCountryItem(countryDetail));
  }
}