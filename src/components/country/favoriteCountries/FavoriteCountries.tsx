import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// file
import { RootState, AppDispatch } from '../../../redux/store'
import { actions } from '../../../redux/slice/countries';

// Mui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';




export default function FavoriteCountries() {
  // get store and state
  const wish = useSelector(
    (state: RootState) => state.country.wish);

    // dispatch for action
    const dispatch = useDispatch<AppDispatch>();

    // remove wish function
    const handleRemove = (name: string) => {
      dispatch(actions.removeWish(name));
    };

  return (
    <div className="favCard">
      {wish.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            '& > :not(style)': {
              m: 1,
              width: 550,
              fontSize: '2rem',
              marginTop: '4%',
              marginBottom: '4%',
            },
          }}
        >
        <Paper elevation={10} sx={{ paddingTop: '3%' }}>
          There is no country in your wishlist, yet!
        </Paper>
      </Box>
      ) : (
        wish.map((country) => (
          <div key={country.name.common}>
            <Paper
              sx={{
                margin: 'auto',
                marginTop: '2%',
                marginBottom: '2%',
                maxWidth: 500,
                flexGrow: 1
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm container>
                  <Grid item>
                    <CardMedia
                      component='img'
                      image={`${country.flags.svg}`}
                      alt={`${country.name.common}`}
                      sx={{
                      width: '128',
                      height: '128',
                      display: 'flex',
                      flexDirection: 'column',
                      }}
                    />
                  </Grid>
                  <Grid item xs container direction='column' spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant='subtitle1'
                        component='div'
                        sx={{ fontFamily: 'nunito', fontSize: '20px' }}
                      >
                        <b>Country: </b>
                        {country.name.common}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          fontFamily: 'nunito',
                          fontSize: '17px',
                        }}
                        gutterBottom
                      >
                        <b>Capital: </b>
                        {country.capital ? country.capital : 'No capital'}
                        <br />
                        <b>Region: </b>
                        {country.region}
                        <br />
                      </Typography>
                    </Grid>
                    <Grid item>
                    <Tooltip title="Remove from wishlist">
                      <Button
                        variant="text"
                        startIcon={<DeleteIcon />}
                        sx={{
                          cursor: 'pointer',
                          color: 'black',
                          fontFamily: 'nunito',
                          fontWeight: '700',
                        }}
                        onClick={() => {
                          handleRemove(country.name.common);
                        }}
                      >
                        Remove
                      </Button>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))
      )}
    </div>
  )
}
