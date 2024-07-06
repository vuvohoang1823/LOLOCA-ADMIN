import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Pagination, Box, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PageLayout from '../components/PageLayout';

const createData = (
  transactionId: string,
  user: string,
  date: string,
  method: string,
  amount: number,
  status: string,
  description: string
) => {
  return { transactionId, user, date, method, amount, status, description };
};

const transactions = [
  createData('T001', 'John Doe', '2023-07-01', 'Credit Card', 10000, 'Completed', 'Payment for Order O001'),
  createData('T002', 'Jane Smith', '2023-07-02', 'PayPal', 20000, 'Pending', 'Payment for Order O002'),
  createData('T003', 'John Doe', '2023-07-03', 'Credit Card', 10050, 'Failed', 'Payment for Order O003'),
  createData('T004', 'Alice Johnson', '2023-07-04', 'Credit Card', 30000, 'Completed', 'Payment for Order O004'),
  createData('T005', 'Bob Brown', '2023-07-05', 'PayPal', 25000, 'Completed', 'Payment for Order O005'),
  createData('T006', 'Charlie Green', '2023-07-06', 'Credit Card', 40000, 'Pending', 'Payment for Order O006'),
  createData('T007', 'David Black', '2023-07-07', 'PayPal', 35000, 'Failed', 'Payment for Order O007'),
  createData('T008', 'Eve White', '2023-07-08', 'Credit Card', 50000, 'Completed', 'Payment for Order O008'),
  createData('T009', 'Frank Gray', '2023-07-09', 'PayPal', 45000, 'Completed', 'Payment for Order O009'),
  createData('T010', 'Grace Yellow', '2023-07-10', 'Credit Card', 60000, 'Pending', 'Payment for Order O010'),
  createData('T011', 'Henry Blue', '2023-07-11', 'PayPal', 55000, 'Failed', 'Payment for Order O011'),
  createData('T012', 'Ivy Red', '2023-07-12', 'Credit Card', 70990, 'Completed', 'Payment for Order O012'),
];

const rowsPerPage = 6;

const Payment: React.FC = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleViewDetails = (transactionId: string) => {
    console.log(`Detailed view for transaction ${transactionId}`);
  };

  const displayedTransactions = transactions.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <PageLayout title="Payment Management">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#004AAD', color: 'white' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>User</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Method</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedTransactions.map((transaction, index) => (
              <TableRow key={transaction.transactionId} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>{transaction.user}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.method}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={transaction.status}
                    color={transaction.status === 'Completed' ? 'success' : transaction.status === 'Pending' ? 'warning' : 'error'}
                    sx={{ fontWeight: 'bold', width: 100, textAlign: 'center' }}
                  />
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewDetails(transaction.transactionId)}>
                    <VisibilityIcon sx={{ color: '#004AAD' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(transactions.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </PageLayout>
  );
};

export default Payment;
