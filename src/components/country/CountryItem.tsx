import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// files
import { actions } from '../../redux/slice/countries';
import { Country } from '../../types/type';
import { AppDispatch, RootState } from '../../redux/store';

// Mui
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CountryItem() {
  // select store and state
  const countryList = useSelector(
    (state: RootState) => state.country.countries)

  const countryDetail = useSelector(
    (state: RootState) => state.country.country);

  const wishCountries = useSelector(
    (state: RootState) => state.country.wish
  );

  // set state
  const [loading, setLoading] = useState<boolean>(true);

    const country = countryDetail[0];

    // loading with useEffect
    useEffect(() => {
      if (countryDetail.length !== 0) {
        setLoading(false);
      }
    }, [countryDetail.length]);

    // favorite button handler
    const dispatch = useDispatch<AppDispatch>();

  const wishBtnHandler = (wish: Country) => {
    const hasDuplicate = wishCountries.some(
      (country) =>
        country.name.common.toLocaleLowerCase() ===
        wish.name.common.toLocaleLowerCase()
    );
    if (hasDuplicate) {
      alert('This country is already in your wishlist.');
    } else {
      dispatch(actions.addWish(wish));
    }
  };

  return (
    <div className="country-container">
      {loading && <div> Loading... </div>}
      {!loading && (
        <Card
        sx={{
          minWidth: 275,
          width: '400px',
          height: 'auto',
        }}
      >
        <CardMedia
          component='img'
          height='230'
          image={`${country?.flags.svg}`}
          alt={`${country?.name.common}`}
        />
        <CardContent>
          <Typography variant='h5' component='div'>
            {country?.name.common}
          </Typography>
          <Typography sx={{ mb: 3 }} color='text.secondary'>
            {country?.capital}
          </Typography>
          <Typography>
            <Typography>
              Population:
            </Typography>
            <Typography>
              {country?.population}
            </Typography>
          </Typography>
          <Typography>
            <Typography>
              Languages:
            </Typography>
            {/* <Typography>
              {country?.languages}
            </Typography> */}
          </Typography>
          <Typography>
            <Typography>
              Location:
            </Typography>
            <Typography>
            {country?.maps.googleMaps}
            </Typography>
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link to='/'>
            <Button size='small'>Back</Button>
          </Link>

          <Button size='small'
            onClick={() => {
              wishBtnHandler(country);
              // handleClick()
            }}>
            Add to Wish list
          </Button>
        </CardActions>
      </Card>
      )}
    </div>
  )
}
