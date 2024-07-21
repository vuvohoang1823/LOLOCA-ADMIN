import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import type { City } from '../models/city'; // Import type cho City

interface DeleteCityModalProps {
  open: boolean;
  onClose: () => void;
  city: City | null;
  onConfirm: () => void;
}

const DeleteCityModal: React.FC<DeleteCityModalProps> = ({ open, onClose, city, onConfirm }) => {
  const handleDelete = () => {
    console.log(`Deleted city: ${city?.name}`);
    onConfirm();
  };

  return (
    <Modal open={open} onClose={onClose} BackdropProps={{ onClick: (e) => e.stopPropagation() }}>
      <Box sx={{ width: 400, margin: '100px auto', backgroundColor: 'white', padding: 3, borderRadius: 2, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <WarningAmberIcon sx={{ fontSize: 40, color: 'orange' }} />
        </Box>
        {city && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Are you sure?
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Bạn có chắc muốn xóa thành phố {city.name}? This action cannot be undone.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Button variant="contained" color="error" onClick={handleDelete} fullWidth>
                Delete
              </Button>
              <Button variant="contained" sx={{ backgroundColor: '#b0b0b0', '&:hover': { backgroundColor: '#a0a0a0' } }} onClick={onClose} fullWidth>
                Cancel
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default DeleteCityModal;
