import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography, Chip, Button, Pagination } from '@mui/material';
import PageLayout from '../components/PageLayout';
import AddCityModal from './AddCityModal';

const createData = (
  id: number,
  name: string,
  description: string,
  toursCreated: number,
  toursCompleted: number,
  status: string,
  image: string
) => {
  return { id, name, description, toursCreated, toursCompleted, status, image };
};

const cities = [
  createData(1, 'Hà Nội', 'Thủ đô của Việt Nam, với nhiều địa điểm du lịch hấp dẫn.', 5, 3, 'Active', 'https://via.placeholder.com/150'),
  createData(2, 'Hồ Chí Minh', 'Thành phố lớn nhất Việt Nam, trung tâm kinh tế và văn hóa.', 8, 6, 'Inactive', 'https://via.placeholder.com/150'),
  createData(3, 'Đà Nẵng', 'Thành phố biển nổi tiếng với những bãi biển đẹp.', 7, 4, 'Active', 'https://via.placeholder.com/150'),
  createData(4, 'Huế', 'Cố đô Huế, nổi tiếng với di sản văn hóa.', 4, 2, 'Inactive', 'https://via.placeholder.com/150'),
  createData(5, 'Hội An', 'Thành phố cổ, di sản văn hóa thế giới.', 6, 5, 'Active', 'https://via.placeholder.com/150'),
  createData(6, 'Hạ Long', 'Thành phố biển, nổi tiếng với vịnh Hạ Long.', 3, 3, 'Inactive', 'https://via.placeholder.com/150'),
  createData(7, 'Nha Trang', 'Thành phố biển với nhiều khu nghỉ dưỡng đẹp.', 5, 4, 'Active', 'https://via.placeholder.com/150'),
  createData(8, 'Cần Thơ', 'Thành phố miền Tây với nhiều điểm du lịch sinh thái.', 6, 5, 'Inactive', 'https://via.placeholder.com/150'),
  createData(9, 'Phú Quốc', 'Đảo ngọc, địa điểm du lịch nổi tiếng.', 4, 3, 'Active', 'https://via.placeholder.com/150'),
  createData(10, 'Vũng Tàu', 'Thành phố biển với bãi tắm đẹp.', 7, 6, 'Inactive', 'https://via.placeholder.com/150'),
  createData(11, 'Sapa', 'Thành phố du lịch nổi tiếng với cảnh đẹp.', 5, 4, 'Active', 'https://via.placeholder.com/150'),
  createData(12, 'Đà Lạt', 'Thành phố ngàn hoa, địa điểm du lịch nổi tiếng.', 8, 7, 'Inactive', 'https://via.placeholder.com/150'),
];

const rowsPerPage = 9;

const City: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'Active' | 'Inactive' | 'All'>('All');
  const [openModal, setOpenModal] = useState(false);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (newFilter: 'Active' | 'Inactive' | 'All') => {
    setFilter(newFilter);
    setPage(1);
  };

  const filteredCities = filter === 'All' ? cities : cities.filter(city => city.status === filter);
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
        {displayedCities.map((city) => (
          <Grid item xs={12} sm={6} md={4} key={city.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={city.image}
                alt={city.name}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {city.name}
                  </Typography>
                  <Chip
                    label={city.status}
                    color={city.status === 'Active' ? 'success' : 'default'}
                    sx={{ backgroundColor: city.status === 'Inactive' ? 'red' : undefined, color: 'white', fontWeight: 'bold' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {city.description}
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
                  <Button variant="contained" size="small">Xem chi tiết</Button>
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
    </PageLayout>
  );
};

export default City;
