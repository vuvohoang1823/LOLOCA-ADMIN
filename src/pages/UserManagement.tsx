import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, Menu, MenuItem, Chip, Pagination, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import PageLayout from '../components/PageLayout';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';

const createData = (
  accountId: number,
  avatar: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  phone: string,
  status: string
) => {
  return { accountId, avatar, firstName, lastName, dateOfBirth, email, phone, status };
};

const rows = [
  createData(1, 'https://via.placeholder.com/40', 'John', 'Doe', '01/01/1990', 'john.doe@example.com', '1234567890', 'Active'),
  createData(2, 'https://via.placeholder.com/40', 'Jane', 'Smith', '02/02/1985', 'jane.smith@example.com', '0987654321', 'Inactive'),
  createData(3, 'https://via.placeholder.com/40', 'Alice', 'Johnson', '03/03/1995', 'alice.johnson@example.com', '9876543210', 'Active'),
  createData(4, 'https://via.placeholder.com/40', 'Bob', 'Williams', '04/04/1980', 'bob.williams@example.com', '0123456789', 'Inactive'),
  createData(5, 'https://via.placeholder.com/40', 'Emma', 'Brown', '05/05/1992', 'emma.brown@example.com', '1357924680', 'Active'),
  createData(6, 'https://via.placeholder.com/40', 'Michael', 'Davis', '06/06/1988', 'michael.davis@example.com', '2468013579', 'Inactive'),
  createData(7, 'https://via.placeholder.com/40', 'Olivia', 'Miller', '07/07/1997', 'olivia.miller@example.com', '3698521470', 'Active'),
  createData(8, 'https://via.placeholder.com/40', 'James', 'Wilson', '08/08/1982', 'james.wilson@example.com', '4807531926', 'Inactive'),
  createData(9, 'https://via.placeholder.com/40', 'Sophia', 'Taylor', '09/09/1991', 'sophia.taylor@example.com', '5918642073', 'Active'),
  createData(10, 'https://via.placeholder.com/40', 'Benjamin', 'Anderson', '10/10/1987', 'benjamin.anderson@example.com', '6029754318', 'Inactive'),
  createData(11, 'https://via.placeholder.com/40', 'Ava', 'Thomas', '11/11/1996', 'ava.thomas@example.com', '7130865294', 'Active'),
  createData(12, 'https://via.placeholder.com/40', 'William', 'Harris', '12/12/1984', 'william.harris@example.com', '8241976350', 'Inactive'),
  createData(13, 'https://via.placeholder.com/40', 'Mia', 'Clark', '13/01/1993', 'mia.clark@example.com', '9352087416', 'Active'),
  createData(14, 'https://via.placeholder.com/40', 'Alexander', 'Lewis', '14/02/1989', 'alexander.lewis@example.com', '0461573928', 'Inactive'),
  createData(15, 'https://via.placeholder.com/40', 'Charlotte', 'Lee', '15/03/1998', 'charlotte.lee@example.com', '1572684035', 'Active'),
  createData(16, 'https://via.placeholder.com/40', 'Ethan', 'Walker', '16/04/1986', 'ethan.walker@example.com', '2683795142', 'Inactive'),
  createData(17, 'https://via.placeholder.com/40', 'Amelia', 'Hall', '17/05/1995', 'amelia.hall@example.com', '3794806251', 'Active'),
  createData(18, 'https://via.placeholder.com/40', 'Daniel', 'Young', '18/06/1983', 'daniel.young@example.com', '4805917362', 'Inactive'),
  createData(19, 'https://via.placeholder.com/40', 'Harper', 'Allen', '19/07/1992', 'harper.allen@example.com', '5916028473', 'Active'),
  createData(20, 'https://via.placeholder.com/40', 'Sophia', 'King', '20/08/1981', 'sophia.king@example.com', '6027139584', 'Inactive'),
];

const rowsPerPage = 6;

const UserManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!editModalOpen && !deleteModalOpen) {
      setAnchorEl(null);
    }
  }, [editModalOpen, deleteModalOpen]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, user: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
    handleCloseMenu();
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
    handleCloseMenu();
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleDeleteUser = () => {
    console.log('User deleted');
    setDeleteModalOpen(false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const displayedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <PageLayout title="User Management">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#004AAD', color: 'white' }}>
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
            {displayedRows.map((row) => (
              <TableRow key={row.accountId} sx={{ backgroundColor: row.accountId % 2 === 0 ? '#f5f5f5' : 'white' }}>
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
                      fontWeight: 'bold',
                      width: 100,
                      textAlign: 'center'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuClick(event, row)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleEditClick}>
                      <EditIcon sx={{ mr: 1, color: 'blue' }} /> Edit
                    </MenuItem>
                    <MenuItem onClick={handleDeleteClick}>
                      <LockIcon sx={{ mr: 1, color: 'red' }} /> Delete User
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      {selectedUser && (
        <EditUserModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          user={selectedUser}
        />
      )}
      {selectedUser && (
        <DeleteUserModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteUser}
          user={selectedUser}
        />
      )}
    </PageLayout>
  );
};

export default UserManagement;
