import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Avatar } from '@mui/material';

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    avatar: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
  };
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, onClose, user }) => {
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  useEffect(() => {
    setEmail(user.email);
    setPhone(user.phone);
  }, [user]);

  const handleCancel = () => {
    setEmail(user.email);
    setPhone(user.phone);
    onClose();
  };

  const handleConfirm = () => {
    console.log('Confirmed changes');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      BackdropProps={{ onClick: (e) => e.stopPropagation() }} // Ngăn việc đóng modal khi click vào backdrop
    >
      <Box sx={{ width: 400, margin: '100px auto', backgroundColor: 'white', padding: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar src={user.avatar} sx={{ width: 100, height: 100 }} />
        </Box>
        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          value={`${user.firstName} ${user.lastName}`}
          InputProps={{ readOnly: true }}
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        <TextField
          label="Date of Birth"
          fullWidth
          margin="normal"
          value={user.dateOfBirth}
          InputProps={{ readOnly: true }}
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#b0b0b0', '&:hover': { backgroundColor: '#a0a0a0' } }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm Change
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
