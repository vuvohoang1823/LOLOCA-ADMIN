import React, { useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../services/authService';

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state as { email: string };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await verifyOtp(email, otp);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError('Sai mã OTP');
      } else {
        setError('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src="https://www.jaivikkheti.in/javikadminnew/images/loginimg.png" sx={{ m: 3, bgcolor: '#004AAD', width: '100px', height: '100px' }} />
        <Typography component="h1" variant="h5">OTP Verification</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="OTP"
            name="otp"
            autoFocus
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ height: '50px', mt: 3, mb: 2, backgroundColor: '#004AAD', color: 'white', '&:hover': { backgroundColor: '#1F60B7' } }}>
            Verify OTP
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OtpVerification;
