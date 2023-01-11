import React from 'react'

import Search from "../components/search/Search";
import CountryList from "../components/country/countryList/CountryList"

export default function Home() {
  return (
    <div>
      <Search />
      <CountryList />
    </div>
  );
}
