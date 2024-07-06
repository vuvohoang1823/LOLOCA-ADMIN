import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Box, Avatar, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TourIcon from '@mui/icons-material/Tour';
import PaymentIcon from '@mui/icons-material/Payment';
import { SvgIconProps } from '@mui/material/SvgIcon';
import logo from '../assets/logo.png';

const iconStyles: SvgIconProps = {
  sx: { color: '#FFDE59' }
};

const Sidebar: React.FC = () => {
  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon {...iconStyles} /> },
    { text: 'User', path: '/user-management', icon: <PeopleIcon {...iconStyles} /> },
    { text: 'City', path: '/city', icon: <LocationCityIcon {...iconStyles} /> },
    { text: 'Tour', path: '/tour', icon: <TourIcon {...iconStyles} /> },
    { text: 'Payment', path: '/payment', icon: <PaymentIcon {...iconStyles} /> },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic đăng xuất (ví dụ: xóa token, xóa session, v.v.)
    console.log('Logout clicked');
    // Chuyển hướng đến trang đăng nhập
    navigate('/signin');
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', backgroundColor: '#000000', color: '#FFFFFF' } }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mb: '40px' }}>
        <img src={logo} alt="LOLOCA Logo" style={{ width: 100, height: 100 }} />
        <Avatar alt="Profile Picture" src="" sx={{ width: 56, height: 56, mt: 5 }} />
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                ml: 3, mr: 2, py: 1, borderRadius: '24px', mb: '10px',
                '&.Mui-selected': { backgroundColor: '#004AAD', color: 'white', '&:hover': { backgroundColor: '#1F60B7' } },
                '&:not(:last-child)': { mb: 1 },
              }}
              selected={location.pathname === item.path}
            >
              <ListItemIcon sx={{ color: '#FFDE59' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#004AAD',
            fontWeight: 'bold',
            color: 'white',
            '&:hover': { backgroundColor: '#1F60B7' }
          }}
          onClick={handleLogout}
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
