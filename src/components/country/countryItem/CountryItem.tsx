import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// files
import { RootState, AppDispatch } from '../../../redux/store';
import { actions } from '../../../redux/slice/countries';
import { fetchCountryItem } from '../../../redux/thunk/countries';
import LoadingPage from '../../loading/LoadingPage';

// Mui
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Country } from '../../../types/type';


export default function CountryItem() {

  // select store and state
  const countryDetail = useSelector(
    (state: RootState) => state.country.country);

  const wishCountries = useSelector(
    (state: RootState) => state.country.wish);

  const countryList = useSelector(
    (state: RootState) => state.country.countries);

  // variable for country
  let {country} = useParams();
  const countryItem = countryDetail[0];
  const index = countryList.findIndex(c => c.name.common === country)

  // useEffect to fetch country data
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCountryItem(country))
  }, [country, dispatch])

  // favorite button handler
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
    <div className="country-container"
      style={
        { display: "flex",
          justifyContent: "center"
        }}>
      {!countryItem  && ( <LoadingPage/>)}
        <Card
        sx={{
          minWidth: 275,
          width: '300',
          height: 'auto',
          flexDirection: 'row',
        }}
        >
        <CardMedia
          component='img'
          height='230'
          image={`${countryList[index]?.flags.svg}`}
          alt={`${countryList[index]?.name.common}`}
        />
        <CardContent>
          <Typography
            variant='h5'
            component='div'
            sx={{ fontFamily: 'nunito', fontWeight: '800' }}>
            {countryList[index]?.name.common}
          </Typography>
          <Typography sx={{ mb: 3, fontFamily: 'nunito'}} color='text.secondary'>
            {countryList[index]?.name.official}
          </Typography>
          <Typography
            variant='body2'
            component='div'
            sx={{
              textAlign: 'left',
              marginLeft: '23%',
              fontFamily: 'nunito',
              fontSize: '18px'
            }}
          >
            <Fragment>
              <b>Region: </b>
              {countryList[index]?.region}
              <br/>
              <b>Capital: </b>
              {countryList[index]?.capital ? countryList[index]?.capital: 'No capital'}
              <br/>
              <b>Population: </b>
              {countryList[index]?.population.toLocaleString('en-US')}
              <br/>
              <b>Languages: </b>
              {
                countryList[index].languages ? Object.values
                (countryList[index].languages).map((languages) => (
                  <li key={crypto.randomUUID()}>{languages}</li>
                  )) : null
              }
              <br/>
              <a href={`${Object.values(countryList[index]?.maps)[0]}`}
                target='_blank'
                rel='noreferrer'
                style={{ textDecoration: 'underline' }}
                >
                Where is it located?
                </a>
            </Fragment>
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button size='small' sx={{ fontFamily: 'nunito' }}>
              Back
            </Button>
          </Link>

          <Button
              size='small'
              sx={{ fontFamily: 'nunito' }}
              onClick={() => {
                wishBtnHandler(countryItem);
              }}
            >
              Add to Wishlist
            </Button>
        </CardActions>
      </Card>
    </div>
  )
}
