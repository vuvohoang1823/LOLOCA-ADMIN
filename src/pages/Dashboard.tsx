import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import PageLayout from '../components/PageLayout';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TourIcon from '@mui/icons-material/Tour';
import PaymentIcon from '@mui/icons-material/Payment';
import { getTotalCities } from '../slices/citySlice';
import { RootState, AppDispatch } from '../store/store';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const totalCities = useSelector((state: RootState) => state.city.totalCities);

  useEffect(() => {
    dispatch(getTotalCities());
  }, [dispatch]);

  const userChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Users',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const revenueChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue',
        data: [300, 400, 300, 500, 600, 700],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <PageLayout title="Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 3, backgroundColor: '#004AAD', color: 'white' }}>
            <PeopleIcon sx={{ fontSize: 40 }} />
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">1500</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 3, backgroundColor: '#28A745', color: 'white' }}>
            <LocationCityIcon sx={{ fontSize: 40 }} />
            <Typography variant="h6">Total Cities</Typography>
            <Typography variant="h4">{totalCities}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 3, backgroundColor: '#FFC107', color: 'white' }}>
            <TourIcon sx={{ fontSize: 40 }} />
            <Typography variant="h6">Total Tours</Typography>
            <Typography variant="h4">300</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 3, backgroundColor: '#DC3545', color: 'white' }}>
            <PaymentIcon sx={{ fontSize: 40 }} />
            <Typography variant="h6">Total Payments</Typography>
            <Typography variant="h4">$500,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '350px', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6">User Registrations</Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Line data={userChartData} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '350px', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6">Monthly Revenue</Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Bar data={revenueChartData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default Dashboard;
