import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Pagination, Box } from '@mui/material';
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
  createData('T001', 'John Doe', '2023-07-01', 'Credit Card', 100, 'Completed', 'Payment for Order O001'),
  createData('T002', 'Jane Smith', '2023-07-02', 'PayPal', 200, 'Pending', 'Payment for Order O002'),
  createData('T003', 'John Doe', '2023-07-03', 'Credit Card', 150, 'Failed', 'Payment for Order O003'),
  createData('T004', 'Alice Johnson', '2023-07-04', 'Credit Card', 300, 'Completed', 'Payment for Order O004'),
  createData('T005', 'Bob Brown', '2023-07-05', 'PayPal', 250, 'Completed', 'Payment for Order O005'),
  createData('T006', 'Charlie Green', '2023-07-06', 'Credit Card', 400, 'Pending', 'Payment for Order O006'),
  createData('T007', 'David Black', '2023-07-07', 'PayPal', 350, 'Failed', 'Payment for Order O007'),
  createData('T008', 'Eve White', '2023-07-08', 'Credit Card', 500, 'Completed', 'Payment for Order O008'),
  createData('T009', 'Frank Gray', '2023-07-09', 'PayPal', 450, 'Completed', 'Payment for Order O009'),
  createData('T010', 'Grace Yellow', '2023-07-10', 'Credit Card', 600, 'Pending', 'Payment for Order O010'),
  createData('T011', 'Henry Blue', '2023-07-11', 'PayPal', 550, 'Failed', 'Payment for Order O011'),
  createData('T012', 'Ivy Red', '2023-07-12', 'Credit Card', 700, 'Completed', 'Payment for Order O012'),
];

const rowsPerPage = 6;

const Payment: React.FC = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const displayedTransactions = transactions.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <PageLayout title="Payment Management">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#004AAD', color: 'white' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Transaction ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>User</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Method</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFDE59' }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedTransactions.map((transaction) => (
              <TableRow key={transaction.transactionId}>
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
