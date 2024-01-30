import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { PrimaryWhiteButton } from '../../styles/Buttons';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'job_title', label: 'Job Title', minWidth: 300 },
    { id: 'company_name', label: 'Company', minWidth: 300 },
    {
        id: 'apply_type',
        label: 'Type',
        minWidth: 200,
    },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#FAFAFA',
        color: '#7F8781',
        fontWeight: '600'
    },
    [`&.${tableCellClasses.body}`]: {
        height: '2.8rem',
        fontSize: 14,
        fontWeight: '500'
    },
}));

const AppliedJobDetailsTable = ({ campaignJobsList }) => {
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
        <Paper variant='outlined' sx={{
            height: 'auto',
            width: '100%', overflow: 'hidden', borderRadius: '6px',
            border: '1px solid #E5E5E5'
        }}>
            <TableContainer sx={{ maxHeight: '70vh' }}>
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
                        {campaignJobsList
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            ?.map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column, columnIndex) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell sx={{ position: 'relative' }} key={column.id} align={column.align}>
                                                    <Box>
                                                        {
                                                            value
                                                        }
                                                    </Box>

                                                </StyledTableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                campaignJobsList?.length > 5 &&
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={campaignJobsList?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }
        </Paper>
    )
}

export default AppliedJobDetailsTable;
