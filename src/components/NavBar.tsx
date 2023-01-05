import React from 'react'
import { Link } from "react-router-dom";

import { Country } from "../types/type"

import Badge, {BadgeProps} from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';

// type Prop = {
//   wishListCountries: Country[];
// }

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -8,
    top: 1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function NavBar() {
  // const wishCount = wishListCountries.length;
  return (
    <div className="navBar">
      <div className="logo-div">
        <a href="/" className='link'>
          <TravelExploreOutlinedIcon />
          {/* <img src={} alt="logo" height="50px" width="50px"></img> */}
        </a>
          <h3 className="logoTitle">Travel wishlist</h3>
      </div>
      <div className="subNav">
        <Link className='link' to="/">Home</Link>
        <Link className='link' to="/wishlist">Wishlist</Link>
        {/* <Badge badgeContent={wishCount} color="primary">
          <Link className='link' to="/wishlist">Wishlist</Link>
        </Badge> */}
        <Link className='link' to="/about">About</Link>
      </div>
    </div>
  )
}
