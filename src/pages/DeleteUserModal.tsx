import React from 'react';
import { Modal, Box, Typography, Button, Avatar } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  user: {
    firstName: string;
    lastName: string;
  };
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ open, onClose, onDelete, user }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{ onClick: (e) => e.stopPropagation() }} // Ngăn việc đóng modal khi click vào backdrop
    >
      <Box sx={{ width: 400, margin: '100px auto', backgroundColor: 'white', padding: 3, borderRadius: 2, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <WarningAmberIcon sx={{ fontSize: 40, color: 'orange' }} />
        </Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Are you sure?
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Bạn có chắc muốn xóa {user.firstName} {user.lastName}? This action cannot be undone.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <Button variant="contained" color="error" onClick={handleDelete} fullWidth>
            Delete
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#b0b0b0', '&:hover': { backgroundColor: '#a0a0a0' } }} onClick={onClose} fullWidth>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteUserModal;
