import React, { useState } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Pagination } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import PageLayout from '../components/PageLayout';

const createData = (
  accountId: number,
  avatar: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  phone: string,
  status: string,
) => {
  return { accountId, avatar, firstName, lastName, dateOfBirth, phone, status };
};

const rows = [
  createData(1, 'https://via.placeholder.com/40', 'John', 'Doe', '01/01/1990', '1234567890', 'Active'),
  createData(2, 'https://via.placeholder.com/40', 'Jane', 'Smith', '02/02/1985', '0987654321', 'Inactive'),
  createData(3, 'https://via.placeholder.com/40', 'Alice', 'Johnson', '03/03/1990', '1122334455', 'Active'),
  createData(4, 'https://via.placeholder.com/40', 'Bob', 'Brown', '04/04/1985', '2233445566', 'Inactive'),
  createData(5, 'https://via.placeholder.com/40', 'Charlie', 'Davis', '05/05/1990', '3344556677', 'Active'),
  createData(6, 'https://via.placeholder.com/40', 'Diana', 'Evans', '06/06/1985', '4455667788', 'Inactive'),
  createData(7, 'https://via.placeholder.com/40', 'Eve', 'Foster', '07/07/1990', '5566778899', 'Active'),
  createData(8, 'https://via.placeholder.com/40', 'Frank', 'Green', '08/08/1985', '6677889900', 'Inactive'),
  createData(9, 'https://via.placeholder.com/40', 'Grace', 'Harris', '09/09/1990', '7788990011', 'Active'),
  createData(10, 'https://via.placeholder.com/40', 'Henry', 'Irwin', '10/10/1985', '8899001122', 'Inactive'),
  createData(11, 'https://via.placeholder.com/40', 'Ivy', 'Jackson', '11/11/1990', '9900112233', 'Active'),
  createData(12, 'https://via.placeholder.com/40', 'Jack', 'King', '12/12/1985', '0011223344', 'Inactive'),
];

const rowsPerPage = 6;

const UserManagement: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, rowId: number) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const displayedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <PageLayout title="User Management">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#004AAD' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Avatar</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Date Of Birth</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow key={row.accountId} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
                <TableCell>{row.accountId}</TableCell>
                <TableCell><Avatar src={row.avatar} /></TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.dateOfBirth}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === 'Active' ? 'success' : 'default'}
                    sx={{
                      backgroundColor: row.status === 'Inactive' ? 'red' : undefined,
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleClick(event, row.accountId)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <EditIcon sx={{ mr: 1, color: 'blue' }} /> Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <LockIcon sx={{ mr: 1, color: 'red' }} /> Lock User
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </PageLayout>
  );
};

export default UserManagement;
