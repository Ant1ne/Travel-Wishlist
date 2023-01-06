import { createSlice } from "@reduxjs/toolkit"

import { Country } from "../../types/type";

type InitialState = {
    countries: Country[];
    country: Country[];
    wish: Country[]
    showLoading: boolean;
};

const initialState: InitialState = {
    countries:[],
    country: [],
    wish: [],
    showLoading: false,
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
        addWish: (state, actions) => {
            state.wish.push({...actions.payload, wish: true});
            },
        removeWish: (state, actions) => {
            state.wish = actions.payload;
            },
        showLoading: (state, actions) => {
            state.showLoading = actions.payload;
            },
        },
    },
);


export const actions = countrySlice.actions;

export default countrySlice.reducer;