import React from 'react'
import { Country } from "../../types/type"

type Prop = {
  country: Country;
}

export default function FavoriteCountries({country}: Prop) {
  return (
    <div className="favCard">
      <div className="favTitle">
        <h2> {country.name.common}</h2>
        <p>{country.capital}</p>
      </div>
      <div>
        <img
          src={country.flags.png}
          alt={country.name.common}
          height="100px"
          width="100px"
        />
      </div>
    </div>
  )
}
