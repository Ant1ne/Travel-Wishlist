import { createSlice } from "@reduxjs/toolkit"

import { Country } from "../../types/type";

type InitialState = {
    countries: Country[];
};

const initialState: InitialState = {
    countries:[],
};

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        getCountryData: (state, actions) => {
            state.countries = actions.payload;
            },
        },
    }
);


export const countryActions = countrySlice.actions;

const reducer = countrySlice.reducer;

export default reducer;