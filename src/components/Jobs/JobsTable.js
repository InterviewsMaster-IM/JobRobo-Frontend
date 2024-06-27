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
import { Link } from 'react-router-dom';

const getCompanyNameFromUrl = (url) => {
    const match = url.match(/\/company\/([^/]+)/);
    if (match && match.length > 1) {
        return match[1]; // Returns the captured company name
    }
    return 'NA'; // Default or error handling
};
const columns = [
    {
        id: 'job_url',
        label: 'Job Url',
        minWidth: 100,
        format: (value) => <Link to={`https://linkedin.com${value}`} target="_blank">Click here</Link>
    },
    {
        id: 'company_id',
        label: 'Company',
        minWidth: 100,
        format: (value) => {
            // Assuming getCompanyNameFromUrl is a function that extracts the company name from the URL
            const companyName = getCompanyNameFromUrl(value);

            return (
                <Link to={value} target="_blank">
                    {companyName}
                </Link>
            );
        }
    },
    {
        id: 'job_title',
        label: 'Job Title',
        minWidth: 100,
    },
    {
        id: 'location',
        label: 'Location',
        minWidth: 150,
    },
    {
        id: 'job_type',
        label: 'Job Type',
        minWidth: 100,
    },
    {
        id: 'remote',
        label: 'Is Remote',
        minWidth: 100,
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

const JobsTable = ({ jobsList }) => {
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
            <TableContainer sx={{ maxHeight: '80vh' }}>
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
                        {jobsList
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            ?.map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column, columnIndex) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell sx={{ position: 'relative' }} key={column.id} align={column.align}>
                                                    <Box>
                                                        {column.format
                                                            ? column.format(value)
                                                            : value}
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
                jobsList?.length > 5 &&
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={jobsList?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }
        </Paper>
    )
}

export default JobsTable;
