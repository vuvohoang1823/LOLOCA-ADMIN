import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography, Chip, Button, Pagination } from '@mui/material';
import PageLayout from '../components/PageLayout';
import AddCityModal from './AddCityModal';
import CityDetailModal from './CityDetailModal';
import { getCities } from '../services/cityService';
import logoNull from '../assets/logo_null.png'; // Import ảnh mặc định

interface City {
  cityId: number;
  name: string;
  cityDescription: string | null;
  cityBanner: string | null;
  cityThumbnail: string | null;
  cityBannerUploadDate: string | null;
  cityThumbnailUploadDate: string | null;
  status: boolean;
  toursCreated: number;
  toursCompleted: number;
}

const rowsPerPage = 9;

const City: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'Active' | 'Inactive' | 'All'>('All');
  const [cities, setCities] = useState<City[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (newFilter: 'Active' | 'Inactive' | 'All') => {
    setFilter(newFilter);
    setPage(1);
  };

  const handleOpenDetailModal = (cityId: number) => {
    setSelectedCityId(cityId);
  };

  const handleCloseDetailModal = () => {
    setSelectedCityId(null);
  };

  const filteredCities = filter === 'All' ? cities : cities.filter(city => (filter === 'Active' ? city.status : !city.status));
  const displayedCities = filteredCities.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <PageLayout
      title="City Management"
      onAdd={() => setOpenModal(true)}
      chips={[
        { label: 'All', onClick: () => handleFilterChange('All'), active: filter === 'All' },
        { label: 'Active', onClick: () => handleFilterChange('Active'), active: filter === 'Active' },
        { label: 'Inactive', onClick: () => handleFilterChange('Inactive'), active: filter === 'Inactive' },
      ]}
    >
      <Grid container spacing={3}>
        {displayedCities.map((city) => (
          <Grid item xs={12} sm={6} md={4} key={city.cityId}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={city.cityThumbnail ?? logoNull} // Sử dụng ảnh mặc định nếu không có ảnh
                alt={city.name}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {city.name}
                  </Typography>
                  <Chip
                    label={city.status ? 'Active' : 'Inactive'}
                    color={city.status ? 'success' : 'default'}
                    sx={{ backgroundColor: city.status ? undefined : 'red', color: 'white', fontWeight: 'bold' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {city.cityDescription}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="body2">
                    Tours Created: {city.toursCreated}
                  </Typography>
                  <Typography variant="body2">
                    Tours Completed: {city.toursCompleted}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Button variant="contained" size="small" onClick={() => handleOpenDetailModal(city.cityId)}>Xem chi tiết</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredCities.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <AddCityModal open={openModal} onClose={() => setOpenModal(false)} />
      {selectedCityId !== null && (
        <CityDetailModal
          open={selectedCityId !== null}
          onClose={handleCloseDetailModal}
          cityId={selectedCityId}
        />
      )}
    </PageLayout>
  );
};

export default City;
