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
import { extensionCommunicationSameJob } from '../../utils/Helpers';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const columns = [
    { id: 'job_board', label: 'Board', minWidth: 90 },
    { id: 'campaign_keyword', label: 'Job Title', minWidth: 200 },
    {
        id: 'location',
        label: 'Location',
        minWidth: 170,
    },
    {
        id: 'campaign_type',
        label: 'Type',
        minWidth: 170,
    },
    {
        id: 'jobs_applied',
        label: 'Applied',
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

const PastJobrobosTable = ({ userCampaignsList }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRow, setSelectedRow] = useState(null);
    const navigate = useNavigate();

    const handleViewDetails = (id) => {
        navigate(`/pastjobrobo/${id}`);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRowClick = (row) => {
        setSelectedRow(row);
    };

    const handleMouseLeave = () => {
        setSelectedRow(null);
    };

    const handleRunThisJobRobo = (rowId) => {
        const curr_data = userCampaignsList?.find((campaign) => campaign.id === rowId);
        extensionCommunicationSameJob("OPEN_JOB_BOARD_WITH_PROPS", {
            platform: curr_data?.job_board,
            jobLocation: curr_data?.location,
            jobTitle: curr_data?.campaign_keyword,
            jobCount: curr_data?.jobs_applied || 5,
            jobType: ["Full-Time", "Part-Time"],
        });
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
                        {userCampaignsList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const { id } = row;
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
                                                                <PrimaryWhiteButton onClick={() => handleRunThisJobRobo(id)}>
                                                                    Run Robo
                                                                    <ArrowOutwardIcon fontSize='small' />
                                                                </PrimaryWhiteButton>
                                                                <PrimaryWhiteButton onClick={() => handleViewDetails(id)}>
                                                                    View Details
                                                                </PrimaryWhiteButton>
                                                            </Box>
                                                            :
                                                            <Box>
                                                                {
                                                                    value
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
            {
                userCampaignsList?.length > 5
                &&
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={userCampaignsList?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }
        </Paper>
    );
}

export default PastJobrobosTable;
