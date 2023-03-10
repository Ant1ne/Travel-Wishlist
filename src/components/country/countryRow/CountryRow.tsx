import React from 'react'
import { Link } from 'react-router-dom';

// file
import { Country } from '../../../types/type';

// Mui
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import BookmarkBorderSharpIcon from '@mui/icons-material/BookmarkBorderSharp';
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Tooltip from '@mui/material/Tooltip';



type Prop = {
    country: Country;
    addWishHandler: any;
    wishCountries: Country[];
    handleClick: Function;
    handleWishClose: Function;
    style: object;
}

export default function CountryRow({
    country,
    addWishHandler,
    wishCountries,
    handleClick,
    handleWishClose,
    style
}: Prop) {

    const wish =  wishCountries.some(
      (item) => item.name.common === country.name.common
   );

  return (
    <TableRow className="country-row"
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
      key={country.name.common}
    >
      <TableCell
        component='th'
        align='center'
        scope='row'
      >
        <img src={country.flags.svg} alt={country.name.common} />
      </TableCell>
      <TableCell align='center' sx={style}>
        {country.name.common}
      </TableCell>
      <TableCell align='center' sx={style}>
        {country.region}
      </TableCell>
      <TableCell align='right' sx={style}>
        {country.population.toLocaleString('en-US')}
      </TableCell>
      <TableCell align='center' sx={style}>
        {!wish ?(
          <Tooltip title="Add to wishlist">
            <BookmarkBorderSharpIcon
              aria-label="Add to wishlist"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                addWishHandler(country);
                handleClick();
              }}
            />
          </Tooltip>
            ) : (
          <Tooltip title="Remove from wishlist">
            <BookmarkSharpIcon
              aria-label="Added to wishlist"
              sx={{
                cursor: 'pointer',
                color: 'black'
                }}
              onClick={() => {
                addWishHandler(country);
                handleWishClose();
              }}
            />
          </Tooltip>
          )}

      </TableCell>
      <TableCell align='center' sx={style}>
        <Link to={`/name/${country.name.common}`}>
          <Tooltip title="Read more">
            <ReadMoreIcon
              sx={{ cursor: 'pointer' }}
            />
          </Tooltip>
        </Link>
      </TableCell>
    </TableRow>
  )
}
