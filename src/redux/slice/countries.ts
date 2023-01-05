import { createSlice } from "@reduxjs/toolkit"

import { Country } from "../../types/type";

type InitialState = {
    countries: Country[];
    country: Country[];
    wish: Country[]
    wishListCountries: Country[]
};

const initialState: InitialState = {
    countries:[],
    country: [],
    wish: [],
    wishListCountries:[],
};

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        getCountryList: (state, actions) => {
            state.countries = actions.payload.map((country: Country) =>
            Object.assign({}, country, {wish: false})
            );},
        getCountryItem: (state, actions) => {
            state.country = actions.payload;
            },
        addToWish: (state, actions) => {
            state.wish.push({...actions.payload, wish: true});
            },
        removeToWish: (state, actions) => {
            state.wish = actions.payload;
            },
        // modifyWish: (state, action) => {
        //         const index = state.countries.findIndex(
        //           (country) =>
        //             country.name.common.toLowerCase() ===
        //             actions.payload.name.common.toLowerCase()
        //         );
        //         if (index !== -1) {
        //           state.countries[index].wish = true;
        //         }
        //     },
        },
    }
);


export const actions = countrySlice.actions;

export default countrySlice.reducer;