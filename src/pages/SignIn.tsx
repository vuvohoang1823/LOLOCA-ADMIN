import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { login, verifyOtp } from '../slices/authSlice';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const SignIn = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

  const handleLogin = async () => {
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      setIsOtpDialogOpen(true);
    }
  };

  const handleVerifyOtp = async () => {
    const resultAction = await dispatch(verifyOtp({ email, code: otp }));
    if (verifyOtp.fulfilled.match(resultAction)) {
      setIsOtpDialogOpen(false);
      navigate('/dashboard');  // Chuyển hướng đến trang dashboard
    }
  };

  return (
    <div>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      {error && <p>{error}</p>}
      <Button onClick={handleLogin} disabled={isFetching}>Login</Button>

      <Dialog open={isOtpDialogOpen} onClose={() => setIsOtpDialogOpen(false)}>
        <DialogTitle>Verify OTP</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the OTP sent to your email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="OTP"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOtpDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleVerifyOtp}>Verify</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignIn;
