import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <img src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png" alt="404 Not Found" style={{ width: '100%', maxWidth: '600px', marginBottom: '24px' }} />
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        Page Not Found
      </Typography>
      <Button variant="contained" component={Link} to="/signin" sx={{ backgroundColor: '#004AAD', color: 'white', '&:hover': { backgroundColor: '#1F60B7' } }}>
        Go to Sign In
      </Button>
    </Box>
  );
};

export default NotFound;
