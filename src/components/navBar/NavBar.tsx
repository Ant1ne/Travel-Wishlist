import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// file
import { RootState } from '../../redux/store';

// Mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkBorderSharpIcon from '@mui/icons-material/BookmarkBorderSharp';
import InfoIcon from '@mui/icons-material/Info';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';


export default function NavBar() {
  // get wish state
  const wishCount = useSelector((state: RootState) => state.country.wish);

  return (
    <div>
      <Box sx={{ flexGrow: 0}}>
        <AppBar
          position='static'
          sx={{
            md: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            bgcolor: 'black',
            alignItems: 'center',
            height: '60px',
          }}
        >
          <Box
            sx={{
              letterSpacing: 1,
              fontSize: '25px',
              fontWeight: '500',
              marginLeft: '2%',
            }}
          >
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                color: 'white',
              }}>
            <TravelExploreOutlinedIcon />
            Travel Wishlist
            </Link>
          </Box>

          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
                justifyContent: 'flex-end',
                paddingRight: '3%',
              }
            }}
          >
            <IconButton
              size='large'
              aria-label='Home'
              title='Home'
              color='inherit'
              component={Link}
              to='/'
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              size='large'
              aria-label='Wishlist'
              title='Wishlist'
              color='inherit'
              component={Link}
              to='/wishlist'
            >
              <Badge
                badgeContent={wishCount.length}
                color='error'
              >
                <BookmarkBorderSharpIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              aria-label='Wishlist'
              title='About'
              color='inherit'
              component={Link}
              to='/about'
            >
              <InfoIcon />
            </IconButton>
          </Box>
        </AppBar>
      </Box>
    </div>
  )
}
