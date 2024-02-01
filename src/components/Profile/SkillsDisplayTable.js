import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#FAFAFA',
        color: '#7F8781',
        fontWeight: '600'
    },
    [`&.${tableCellClasses.body}`]: {
        height: '1rem',
        fontSize: 14,
        fontWeight: '500'
    },
}));

const columns = [
    { id: 'skill', label: 'Skill (Top 5)', minWidth: 90 },
    { id: 'years_of_experience', label: 'Experience (in years)', minWidth: 90 },
]

const SkillsDisplayTable = ({ skillDetails }) => {

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
                        {skillDetails.slice(0, 5)
                            .map((skill, index) => {
                                return (
                                    <TableRow tabIndex={-1} key={index}>
                                        <StyledTableCell>{skill?.skill}</StyledTableCell>
                                        <StyledTableCell>{skill?.years_of_experience}</StyledTableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>

    )
}

export default SkillsDisplayTable;
