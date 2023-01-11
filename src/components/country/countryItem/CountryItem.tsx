import React, { useEffect, useState, Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// files
import { RootState } from '../../../redux/store';

// Mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function CountryItem() {

  // select store and state
  const countryDetail = useSelector(
    (state: RootState) => state.country.country);

    const countryList = useSelector(
      (state: RootState) => state.country.countries
    );
  // set state
  const [loading, setLoading] = useState<boolean>(true);

  // variable for country
  let {country} = useParams();
  const countryItem = countryDetail[0];
  const index = countryList.findIndex(c => c.name.common === country)

  // loading with useEffect
  useEffect(() => {
    if (countryDetail.length !== 0) {
      setLoading(false);
    }
  }, [countryDetail.length]);


  return (
    <div className="country-container">
      {loading && <div>Loading...</div>}
      {!loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card
          variant="outlined"
          sx={{
            minWidth: 275,
            width: '400px',
            height: 'auto',
            alignItems:'center',
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
                  (countryList[index].languages).map((language) => (
                    <li key={crypto.randomUUID()}>{language}</li>
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
          <CardActions>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button size='small' sx={{ fontFamily: 'nunito'}}>
                Back
              </Button>
            </Link>
          </CardActions>
        </Card>
        </Box>
      )}
    </div>
  )
}
