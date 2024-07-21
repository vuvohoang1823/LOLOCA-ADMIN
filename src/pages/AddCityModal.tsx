import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

interface AddCityModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCityModal: React.FC<AddCityModalProps> = ({ open, onClose }) => {
  const [cityName, setCityName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setCityName('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
    }
  }, [open]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    console.log('Đã add');
    // Logic để thêm thành phố mới có thể được thêm vào đây
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} BackdropProps={{ onClick: (e) => e.stopPropagation() }}>
      <Box sx={{ width: 400, margin: '100px auto', backgroundColor: 'white', padding: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Thêm thành phố mới
        </Typography>
        <TextField
          label="Tên thành phố"
          fullWidth
          margin="normal"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <TextField
          label="Mô tả"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
            Chọn ảnh
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
          {imagePreview && (
            <Box sx={{ marginLeft: 2 }}>
              <img src={imagePreview} alt="Preview" style={{ width: 100, height: 100, objectFit: 'cover' }} />
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#b0b0b0', '&:hover': { backgroundColor: '#a0a0a0' }, mr: 2 }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCityModal;
