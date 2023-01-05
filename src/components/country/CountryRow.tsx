import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

import { Country } from '../../types/type';
import { fetchCountryItem } from '../../redux/thunk/countries';
import { actions } from '../../redux/slice/countries';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


type Prop = {
    countryList: Country[];
    country: Country;
    wish: boolean;
    addWishHandler: any;
    // setWishCheck: React.Dispatch<React.SetStateAction<boolean>>;
    style: object;
}

export default function CountryRow({
    countryList,
    country,
    wish,
    addWishHandler,
    style,
    // setWishCheck,
    // wishCheck
}: Prop) {

    // dispatch actions
    const dispatch = useDispatch<AppDispatch>();

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
      key={country.name.common}
    >
      <TableCell
        component='th'
        align='center'
        scope='row'
        sx={{ fontSize: '30px' }}
      >
        {country.flag}
      </TableCell>
      <TableCell align='center' sx={style}>
        {country.name.common}
      </TableCell>
      <TableCell align='center' sx={style}>
        {country.region}
      </TableCell>
      <TableCell align='center' sx={style}>
        {country.population}
      </TableCell>
      {/* <TableCell align='center' sx={style}>
        {country.languages}
      </TableCell> */}
      <TableCell align='center' sx={style}>
        <IconButton aria-label="Add to wishlist">
          <FavoriteIcon
          onClick={addWishHandler}
          sx={{ cursor: "pointer"}}
          color='error'
          />
        </IconButton>
      </TableCell>
      <TableCell align='center' sx={style}>
        <Link to={`/name/${country.name.common}`}>
          <MoreHorizIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              dispatch(fetchCountryItem(country.name.common));
            }}
          />
        </Link>
      </TableCell>
    </TableRow>
  )
}

