import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography, Chip, Avatar, Button, Pagination } from '@mui/material';
import PageLayout from '../components/PageLayout';

const createData = (
  id: number,
  name: string,
  duration: string,
  activityLevel: string,
  city: string,
  tourGuide: { name: string, avatar: string },
  status: string,
  image: string
) => {
  return { id, name, duration, activityLevel, city, tourGuide, status, image };
};

const tours = [
  createData(1, 'Tour Hà Nội', '3 ngày', 'Easy', 'Hà Nội', { name: 'Nguyễn Văn A', avatar: 'https://via.placeholder.com/40' }, 'Cần duyệt', 'https://via.placeholder.com/150'),
  createData(2, 'Tour Hồ Chí Minh', '4 ngày', 'Medium', 'Hồ Chí Minh', { name: 'Trần Thị B', avatar: 'https://via.placeholder.com/40' }, 'Đang diễn ra', 'https://via.placeholder.com/150'),
  createData(3, 'Tour Đà Nẵng', '5 ngày', 'Hard', 'Đà Nẵng', { name: 'Lê Văn C', avatar: 'https://via.placeholder.com/40' }, 'Hoàn thành', 'https://via.placeholder.com/150'),
  createData(4, 'Tour Huế', '2 ngày', 'Easy', 'Huế', { name: 'Phạm Thị D', avatar: 'https://via.placeholder.com/40' }, 'Cần duyệt', 'https://via.placeholder.com/150'),
  createData(5, 'Tour Hội An', '3 ngày', 'Medium', 'Hội An', { name: 'Nguyễn Văn E', avatar: 'https://via.placeholder.com/40' }, 'Đang diễn ra', 'https://via.placeholder.com/150'),
  createData(6, 'Tour Hạ Long', '4 ngày', 'Hard', 'Hạ Long', { name: 'Trần Thị F', avatar: 'https://via.placeholder.com/40' }, 'Hoàn thành', 'https://via.placeholder.com/150'),
  createData(7, 'Tour Nha Trang', '5 ngày', 'Easy', 'Nha Trang', { name: 'Lê Văn G', avatar: 'https://via.placeholder.com/40' }, 'Cần duyệt', 'https://via.placeholder.com/150'),
  createData(8, 'Tour Cần Thơ', '3 ngày', 'Medium', 'Cần Thơ', { name: 'Phạm Thị H', avatar: 'https://via.placeholder.com/40' }, 'Đang diễn ra', 'https://via.placeholder.com/150'),
  createData(9, 'Tour Phú Quốc', '4 ngày', 'Hard', 'Phú Quốc', { name: 'Nguyễn Văn I', avatar: 'https://via.placeholder.com/40' }, 'Hoàn thành', 'https://via.placeholder.com/150'),
  createData(10, 'Tour Vũng Tàu', '5 ngày', 'Easy', 'Vũng Tàu', { name: 'Trần Thị K', avatar: 'https://via.placeholder.com/40' }, 'Cần duyệt', 'https://via.placeholder.com/150'),
  createData(11, 'Tour Sapa', '3 ngày', 'Medium', 'Sapa', { name: 'Lê Văn L', avatar: 'https://via.placeholder.com/40' }, 'Đang diễn ra', 'https://via.placeholder.com/150'),
  createData(12, 'Tour Đà Lạt', '4 ngày', 'Hard', 'Đà Lạt', { name: 'Phạm Thị M', avatar: 'https://via.placeholder.com/40' }, 'Hoàn thành', 'https://via.placeholder.com/150'),
];

const rowsPerPage = 9;

const Tour: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'All' | 'Cần duyệt' | 'Đang diễn ra' | 'Hoàn thành'>('All');

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (newFilter: 'All' | 'Cần duyệt' | 'Đang diễn ra' | 'Hoàn thành') => {
    setFilter(newFilter);
    setPage(1);
  };

  const filteredTours = filter === 'All' ? tours : tours.filter(tour => tour.status === filter);
  const displayedTours = filteredTours.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <PageLayout
      title="Tour Management"
      chips={[
        { label: 'All', onClick: () => handleFilterChange('All'), active: filter === 'All' },
        { label: 'Cần duyệt', onClick: () => handleFilterChange('Cần duyệt'), active: filter === 'Cần duyệt' },
        { label: 'Đang diễn ra', onClick: () => handleFilterChange('Đang diễn ra'), active: filter === 'Đang diễn ra' },
        { label: 'Hoàn thành', onClick: () => handleFilterChange('Hoàn thành'), active: filter === 'Hoàn thành' },
      ]}
    >
      <Grid container spacing={3}>
        {displayedTours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={tour.image}
                alt={tour.name}
              />
              <CardContent>
                <Box sx={{ position: 'relative' }}>
                  <Chip
                    label={tour.status}
                    color={tour.status === 'Hoàn thành' ? 'success' : tour.status === 'Đang diễn ra' ? 'primary' : 'default'}
                    sx={{
                      position: 'absolute',
                      top: -200,
                      left: -2,
                      backgroundColor: tour.status === 'Cần duyệt' ? 'orange' : tour.status === 'Hoàn thành' ? 'green' : undefined,
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </Box>
                <Typography gutterBottom variant="h5" component="div">
                  {tour.name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {tour.duration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tour.activityLevel}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  City: {tour.city}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Avatar src={tour.tourGuide.avatar} sx={{ marginRight: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {tour.tourGuide.name}
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
          count={Math.ceil(filteredTours.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </PageLayout>
  );
};

export default Tour;
