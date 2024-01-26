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
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 270,
        format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
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

const PastJobrobosTable = ({ userCampaignsList }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate('/pastjobrobo/1');
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRowClick = (row) => {
        console.log(row);
        setSelectedRow(row);
    };

    const handleMouseLeave = () => {
        setSelectedRow(null);
    };

    return (
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
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onMouseEnter={() => handleRowClick(index)} onMouseLeave={() => handleMouseLeave()}>
                                        {columns.map((column, columnIndex) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell sx={{ position: 'relative' }} key={column.id} align={column.align}>
                                                    {
                                                        selectedRow === index && columnIndex === columns.length - 1
                                                            ?
                                                            <Box position={'absolute'} top={'20%'} left={'0%'} paddingLeft={'16px'} boxSizing={'border-box'} display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap={'1rem'}>
                                                                <PrimaryWhiteButton>
                                                                    Run Robo
                                                                </PrimaryWhiteButton>
                                                                <PrimaryWhiteButton onClick={() => handleViewDetails()}>
                                                                    View Details
                                                                </PrimaryWhiteButton>
                                                            </Box>
                                                            :
                                                            <Box>
                                                                {
                                                                    column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value
                                                                }
                                                            </Box>
                                                    }
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
    );
}

export default PastJobrobosTable;
