import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  onAdd?: () => void;
  chips?: { label: string, onClick: () => void, active?: boolean }[];
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children, onAdd, chips }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ marginRight: 2 }}>
            {title}
          </Typography>
          {chips && chips.map((chip, index) => (
            <Chip
              key={index}
              label={chip.label}
              onClick={chip.onClick}
              sx={{
                marginRight: 1,
                width: 130,
                fontWeight: 'bold',
                backgroundColor: chip.active ? '#004AAD' : 'default',
                color: chip.active ? '#FFDE59' : 'default'
              }}
            />
          ))}
        </Box>
        {onAdd && (
          <Button variant="contained" onClick={onAdd}>
            Thêm thành phố
          </Button>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default PageLayout;
