'use client';
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import { useState } from 'react';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: `${theme.shape.borderRadius * 20}px !important`,
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  }));

function createData(teamId, name, managerId, location, ageGroup, contactInfo) {
  return { teamId, name, managerId, location, ageGroup, contactInfo };
}

const rows = [
    createData(1, 'Manchester United', 101, 'Manchester', 'U18', 'manutd@example.com'),
    createData(2, 'Liverpool', 102, 'Liverpool', 'U21', 'liverpool@example.com'),
    createData(3, 'Chelsea', 103, 'London', 'U18', 'chelsea@example.com'),
    createData(4, 'Arsenal', 104, 'London', 'U16', 'arsenal@example.com'),
    createData(5, 'Manchester City', 105, 'Manchester', 'U21', 'mancity@example.com'),
    createData(6, 'Tottenham Hotspur', 106, 'London', 'U18', 'spurs@example.com'),
    createData(7, 'Leicester City', 107, 'Leicester', 'U16', 'leicester@example.com'),
    createData(8, 'Everton', 108, 'Liverpool', 'U18', 'everton@example.com'),
    createData(9, 'West Ham United', 109, 'London', 'U21', 'westham@example.com'),
    createData(10, 'Aston Villa', 110, 'Birmingham', 'U16', 'astonvilla@example.com'),
    createData(11, 'Newcastle United', 201, 'Newcastle', 'U18', 'newcastle@example.com'),
    createData(12, 'Brighton & Hove Albion', 202, 'Brighton', 'U21', 'brighton@example.com'),
    createData(13, 'Crystal Palace', 203, 'London', 'U18', 'crystalpalace@example.com'),
    createData(14, 'Wolverhampton Wanderers', 204, 'Wolverhampton', 'U16', 'wolves@example.com'),
    createData(15, 'Leeds United', 205, 'Leeds', 'U21', 'leeds@example.com'),
    createData(16, 'Southampton', 206, 'Southampton', 'U18', 'southampton@example.com'),
    createData(17, 'Burnley', 207, 'Burnley', 'U16', 'burnley@example.com'),
    createData(18, 'Sheffield United', 208, 'Sheffield', 'U18', 'sheffield@example.com'),
    createData(19, 'Nottingham Forest', 209, 'Nottingham', 'U21', 'nottingham@example.com'),
    createData(20, 'Fulham', 210, 'London', 'U16', 'fulham@example.com'),
];


const TeamPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [rowsToShow] = useState(rows.length);

    const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRowClick = (teamId) => {
        setSelectedTeamId(teamId);
    };

    return (
        <div>
            <header>
                <AdminNav />
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
                <AdminSideBar className='col-start-1 col-end-2'/>

                <div className='col-start-2 col-end-3 flex justify-center text-center'>
                    <div className="pt-5">

                        <div className="pt-5 flex justify-center">
                            <Search sx={{marginBottom: '15px', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',}}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </Search>
                        </div>

                        <div className="pt-1">
                            <TableContainer component={Paper} style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="right">Team ID</StyledTableCell>
                                            <StyledTableCell align="right">Name</StyledTableCell>
                                            <StyledTableCell align="right">Manager ID</StyledTableCell>
                                            <StyledTableCell align="right">Location</StyledTableCell>
                                            <StyledTableCell align="right">Age</StyledTableCell>
                                            <StyledTableCell align="right">Contact Info</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredRows.slice(0, rowsToShow).map((row) => (
                                            <StyledTableRow
                                                key={row.teamId}
                                                onClick={() => handleRowClick(row.teamId)}
                                                style={{
                                                    backgroundColor: row.teamId === selectedTeamId ? '#cae2fc' : 'inherit',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <StyledTableCell component="th" scope="row">{row.teamId}</StyledTableCell>
                                                <StyledTableCell align="right">{row.name}</StyledTableCell>
                                                <StyledTableCell align="right">{row.managerId}</StyledTableCell>
                                                <StyledTableCell align="right">{row.location}</StyledTableCell>
                                                <StyledTableCell align="right">{row.ageGroup}</StyledTableCell>
                                                <StyledTableCell align="right">{row.contactInfo}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div className="pt-8">
                            <div className="inline pr-2">
                                <Button variant="contained" color="success">
                                    Add Team
                                </Button>
                            </div>
                            <div className="inline pl-2">
                                <Button variant="contained">
                                    Edit Team
                                </Button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </main>

            <footer>
                <AdminFooter />
            </footer>
        </div>
    );
};

export default TeamPage;