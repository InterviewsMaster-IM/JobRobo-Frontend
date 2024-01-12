import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';

const columns = [
    { id: 'plan', label: 'Plan', minWidth: 120 },
    { id: 'date', label: 'Date', minWidth: 100 },
    {
        id: 'amount',
        label: 'Amount',
        minWidth: 100,
        format: (value) => `$ ${value.toFixed(2)}`,
    }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#FAFAFA',
        color: '#7F8781',
        fontWeight: '600'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontWeight: '500'
    },
}));

const BillingHistory = ({ history }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={2}>
            <Typography variant='h6' fontWeight={'500'}>
                Your Billing history
            </Typography>
            <Paper variant='outlined' sx={{
                height: 'auto',
                width: '100%', overflow: 'hidden', borderRadius: '6px',
                border: '1px solid #E5E5E5'
            }}>
                <TableContainer sx={{ maxHeight: '75vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((historyEntry, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <StyledTableCell>{historyEntry?.plan?.name}</StyledTableCell>
                                            <StyledTableCell>{format(new Date(historyEntry?.date), 'dd MMM yyyy')}</StyledTableCell>
                                            <StyledTableCell>{columns.find(x => x.id === 'amount').format(parseFloat(historyEntry?.plan?.price))}</StyledTableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={history?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}

export default BillingHistory;
