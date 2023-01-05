import React from 'react'

import Search from "../components/Search";
import CountryList from "../components/country/CountryList"

export default function Home() {
  return (
    <div>
      <Search />
      <CountryList />
    </div>
  );
}
