import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import fetchCountryData from '../../redux/thunk/countries';
import CountryItem from './CountryItem';

export default function CountryList() {
    const countryList = useSelector(
        (state: RootState) => state.country.countries)

        const dispatch = useDispatch<AppDispatch>();

        useEffect(() => {
            dispatch(fetchCountryData());
        }, [dispatch]);

  return (
    <div>
        Countries List
        <div>
            {countryList.map ((item) =>
                <CountryItem key={crypto.randomUUID()} />)
            }
        </div>
    </div>
  )
}
