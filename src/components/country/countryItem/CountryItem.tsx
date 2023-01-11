import React, { useEffect, Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// files
import { RootState, AppDispatch } from '../../../redux/store';
import { actions } from '../../../redux/slice/countries';
import { fetchCountryItem } from '../../../redux/thunk/countries';
import LoadingPage from '../../loading/LoadingPage';
import { Country } from '../../../types/type';

// Mui
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

  // Mui alert
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });


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

      // Mui Snackbar
      const [open, setOpen] = useState<boolean>(false);

      const handleClick = () => {
        setOpen(true);
      };

      const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
      };

      // Mui Snackbar actions
      const action = (
        <Fragment>
          <IconButton
            size='small'
            aria-label='close'
            color='primary'
            onClick={handleClose}
          >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Fragment>
    );

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
                handleClick();
              }}
            >
              Add to Wishlist
            </Button>
        </CardActions>
      </Card>
      <div>
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            action={action}
          >
          <Alert
            onClose={handleClose}
            severity='info'
            sx={{ width: '100%' }}
          >
            The country is successfully added to your travel wishlist
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}
