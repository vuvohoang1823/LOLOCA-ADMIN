import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { PhotoCamera, Close } from '@mui/icons-material';
import { getCityById } from '../services/cityService';
import DeleteCityModal from './DeleteCityModal';
import logoNull from '../assets/logo_null.png'; // Import ảnh mặc định

interface CityDetailModalProps {
  open: boolean;
  onClose: () => void;
  cityId: number;
}

const CityDetailModal: React.FC<CityDetailModalProps> = ({ open, onClose, cityId }) => {
  const [city, setCity] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    const fetchCity = async () => {
      if (cityId) {
        try {
          const data = await getCityById(cityId);
          setCity(data);
          setName(data.name);
          setDescription(data.cityDescription);
          setImagePreview(data.cityThumbnail || logoNull);
        } catch (error) {
          console.error('Failed to fetch city:', error);
        }
      }
    };

    fetchCity();
  }, [cityId]);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(city.name);
    setDescription(city.cityDescription);
    setImage(null);
    setImagePreview(city.cityThumbnail || logoNull);
  };

  const handleConfirmChange = () => {
    console.log('Updated City:', {
      name,
      description,
      image,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  return (
    <Modal open={open} onClose={(_, reason) => reason === 'backdropClick' ? null : onClose()}>
      <Box sx={{ width: 400, margin: '100px auto', backgroundColor: 'white', padding: 3, borderRadius: 2, position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Close />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          Chi tiết thành phố
        </Typography>
        {city && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
              <img src={imagePreview ?? logoNull} alt="Preview" style={{ width: 150, height: 150, objectFit: 'cover', marginBottom: 16 }} />
              {isEditing && (
                <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                  Chọn ảnh
                  <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
              )}
            </Box>
            <TextField
              label="Tên thành phố"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{ readOnly: !isEditing }}
              sx={{ backgroundColor: !isEditing ? '#f5f5f5' : 'white' }}
            />
            <TextField
              label="Mô tả"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{ readOnly: !isEditing }}
              sx={{ backgroundColor: !isEditing ? '#f5f5f5' : 'white' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    onClick={handleCancel}
                    sx={{ backgroundColor: '#b0b0b0', '&:hover': { backgroundColor: '#a0a0a0' } }}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleConfirmChange}>
                    Confirm Change
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    onClick={handleEdit}
                    sx={{ backgroundColor: '#004AAD', '&:hover': { backgroundColor: '#1F60B7' } }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#DC3545', '&:hover': { backgroundColor: '#b02a37' } }}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Box>
            <DeleteCityModal
              open={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              city={city}
            />
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CityDetailModal;
