import { AppDispatch } from "../store"

import { actions } from "../slice/countries";

const url ="https://restcountries.com/v3.1/all"
const url2 = "https://restcountries.com/v3.1/name"

// fetch all country list
export function fetchCountryData() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(url);
    const countryData = await response.json();
    setTimeout(() => {
      dispatch(actions.getCountryList(countryData));
    }, 1)
  }
}

// fetch one country by name
export function fetchCountryItem (name: string | undefined) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${url2}/${name}`);
    const countryDetail = await response.json();
      setTimeout(() => {
        dispatch(actions.getCountryItem(countryDetail));
      }, 1)
  }
}