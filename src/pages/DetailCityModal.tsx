import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import logoNull from '../assets/logo_null.png';
import DeleteCityModal from './DeleteCityModal';
import type { City } from '../models/city'; // Import type cho City

interface DetailCityModalProps {
  city: City;
  onClose: () => void;
}

const DetailCityModal: React.FC<DetailCityModalProps> = ({ city, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cityName, setCityName] = useState(city.name);
  const [description, setDescription] = useState(city.cityDescription);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(city.cityBanner);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setCityName(city.name);
      setDescription(city.cityDescription);
      setImagePreview(city.cityBanner);
    } else {
      onClose();
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleConfirmUpdate = () => {
    console.log('Update thành công');
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Delete thành công');
    setIsDeleteModalOpen(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Modal open={true} onClose={onClose} BackdropProps={{ onClick: (e) => e.stopPropagation() }}>
        <Box sx={{ width: 400, margin: '100px auto', backgroundColor: 'white', padding: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            {isEditing ? 'Update City' : 'City Details'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <img src={imagePreview || logoNull} alt="City" style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
          </Box>
          {isEditing ? (
            <>
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
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h6">{city.name}</Typography>
              <Typography variant="body2">{city.cityDescription}</Typography>
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: '#b0b0b0', '&:hover': { backgroundColor: '#a0a0a0' }, mr: 2 }} onClick={handleCancel}>
              Cancel
            </Button>
            {isEditing ? (
              <Button variant="contained" onClick={handleConfirmUpdate}>
                Confirm Change
              </Button>
            ) : (
              <>
                <Button variant="contained" sx={{ backgroundColor: 'green' }} onClick={handleUpdate}>
                  Update
                </Button>
                <Button variant="contained" sx={{ backgroundColor: 'red' }} onClick={handleDelete}>
                  Delete
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Modal>
      <DeleteCityModal
        open={isDeleteModalOpen}
        city={city}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
      />
    </>
  );
};

export default DetailCityModal;
