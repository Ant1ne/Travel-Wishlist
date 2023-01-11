import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10%',
      }}
    >
      <div className="loader">
        <CircularProgress size='5rem' />
      </div>
    </Box>
  )
}
