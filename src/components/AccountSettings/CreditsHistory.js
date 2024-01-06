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

const columns = [
    { id: 'plan', label: 'Plan', minWidth: 120 },
    { id: 'date', label: 'Date', minWidth: 100 },
    {
        id: 'amount',
        label: 'Amount',
        minWidth: 100,
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

const CreditsHistory = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = [
        {
            plan: 'JobRobo STANDARD 6 months',
            date: '11 Aug 2023',
            amount: '$ 79.99',
        },
        {
            plan: 'JobRobo Free',
            date: '08 july 2023',
            amount: '$ 0',
        }
    ]

    return (
        <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={2}>
            <Typography variant='h6' fontWeight={'500'}>
                Your Credits history
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
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onMouseEnter={() => { console.log("9384398") }}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <StyledTableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </StyledTableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}

export default CreditsHistory;
