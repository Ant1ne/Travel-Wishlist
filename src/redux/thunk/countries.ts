import { AppDispatch } from "../store"

import { actions } from "../slice/countries";

const url ="https://restcountries.com/v3.1/all"

export function fetchCountryData() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(url)
    const countryData = await response.json();

    dispatch(actions.getCountryList(countryData));
  }
}

export function fetchCountryItem (name: string | undefined) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`url/${name}`)
    const countryDetail = await response.json();
    dispatch(actions.getCountryItem(countryDetail));
  }
}