import React from 'react'

import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';

export default function Footer() {
  return (
    <div className='footer'>
        <footer className="footer-distributed">
            <div className="footer-left">
                {/* <img src={logo} alt="logo" height="50px" width="50px"></img> */}
                <TravelExploreOutlinedIcon />
                <h3>Travel Wishlist</h3>
            </div>
            <div className="footer-links">
                    <a href="/">Home</a>
                    <a href="/wishlist">Wishlist</a>
                    <a href="/about">About</a>
            </div>
            <div className="footer-company-name">&copy; Antoine - 2023
            </div>
            <div className="footer-right">
              <p className="footer-company-about">
              <span>Terms of use</span>
              </p>
            </div>
        </footer>
    </div>
  )
}
