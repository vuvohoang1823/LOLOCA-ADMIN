import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Grid, Typography, Chip, Button, Pagination } from '@mui/material';
import PageLayout from '../components/PageLayout';
import AddCityModal from './AddCityModal';
import DetailCityModal from './DetailCityModal'; // Import modal chi tiết
import { RootState, AppDispatch } from '../store/store';
import { getCities } from '../slices/citySlice';
import logoNull from '../assets/logo_null.png'; // Import ảnh mặc định
import type { City } from '../models/city'; // Import type cho City

const rowsPerPage = 9;

const City: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cityList, isFetching } = useSelector((state: RootState) => state.city);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'Active' | 'Inactive' | 'All'>('All');
  const [openModal, setOpenModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (newFilter: 'Active' | 'Inactive' | 'All') => {
    setFilter(newFilter);
    setPage(1);
  };

  const handleOpenDetail = (city: City) => {
    setSelectedCity(city);
  };

  const handleCloseDetail = () => {
    setSelectedCity(null);
  };

  const filteredCities = filter === 'All' ? cityList : cityList.filter(city => city.status === (filter === 'Active'));
  const displayedCities = filteredCities.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <PageLayout
      title="City"
      onAdd={() => setOpenModal(true)}
      chips={[
        { label: 'All', onClick: () => handleFilterChange('All'), active: filter === 'All' },
        { label: 'Active', onClick: () => handleFilterChange('Active'), active: filter === 'Active' },
        { label: 'Inactive', onClick: () => handleFilterChange('Inactive'), active: filter === 'Inactive' },
      ]}
    >
      <Grid container spacing={3}>
        {isFetching ? (
          <Typography>Loading...</Typography>
        ) : (
          displayedCities.map((city) => (
            <Grid item xs={12} sm={6} md={4} key={city.cityId}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={city.cityBanner || logoNull}
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
                      sx={{ backgroundColor: !city.status ? 'red' : undefined, color: 'white', fontWeight: 'bold' }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {city.cityDescription}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="body2">
                      Tours Created: 0
                    </Typography>
                    <Typography variant="body2">
                      Tours Completed: 0
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Button variant="contained" size="small" onClick={() => handleOpenDetail(city)}>Xem chi tiết</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
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
      {selectedCity && <DetailCityModal city={selectedCity} onClose={handleCloseDetail} />}
    </PageLayout>
  );
};

export default City;
