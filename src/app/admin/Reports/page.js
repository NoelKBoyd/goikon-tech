'use client';
import { useState, useEffect } from 'react';
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { BarChart } from '@mui/x-charts/BarChart';
import TextField from '@mui/material/TextField';



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


  function createData(matchId, goals, assists, yellowCard, redCard, fouls, shotsOnTarget) {
    return { matchId, goals, assists, yellowCard, redCard, fouls, shotsOnTarget };
  }
  
  const rows = [
    createData(1, 3, 2, 1, 0, 12, 7),
    createData(2, 1, 0, 2, 1, 15, 4), 
    createData(3, 4, 3, 0, 0, 10, 9), 
    createData(4, 2, 1, 3, 1, 18, 6),
    createData(5, 0, 0, 1, 0, 8, 2), 
    createData(6, 5, 4, 4, 2, 20, 11),
    createData(7, 3, 2, 2, 1, 14, 8), 
    createData(8, 1, 1, 0, 0, 9, 3),
    createData(9, 2, 0, 1, 0, 11, 5),
    createData(10, 4, 3, 2, 1, 16, 10), 
];

const Reports = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [rowsToShow] = useState(rows.length);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [matches, setMatches] = useState([]);
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const openNewUser = () => {
      setSelectedUser();
      setIsUserDialogOpen(true);
  };
  
  const closeNewUser = () => {
      setSelectedUser();
      setIsUserDialogOpen(false);
  };
    

    const rowClick = (teamId) => {
        setSelectedTeamId(teamId);
    };

    const filteredMatches = matches.filter((match) =>
        match.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
      const openPopup = (match) => {
        setSelectedMatch(match);
        setPopupOpen(true);
      };
    
      const closePopup = () => {
        setSelectedMatch(null);
        setPopupOpen(false);
      };

    useEffect(() => {
        const fetchMatches = async () => {
          try {
            const response = await fetch('/api/auth/admin/reports/getReports'); // Adjust the API route if necessary
            const data = await response.json();
            if (response.ok) {
              setMatches(data); // Update state with fetched match data
            } else {
              console.error('Error fetching match data:', data.error);
            }
          } catch (error) {
            console.error('Error fetching match data:', error);
          }
        };
    
        fetchMatches();
      }, []);

      return (
        <div>
          <header>
            <AdminNav />
          </header>
    
          <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen'>
            <AdminSideBar className='col-start-1 col-end-2' />
    
            <div className='col-start-2 col-end-3 flex justify-center text-center'>
              <div className="pt-5">
                <h1 className="text-3xl pb-3 pl-3 flex justify-left">
                  <strong>Reports</strong>
                </h1>
    
                <div className="flex justify-left">
                  <Search sx={{ marginBottom: '15px', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
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
                    <Table stickyHeader sx={{ minWidth: 800 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">Match ID</StyledTableCell>
                          <StyledTableCell align="center">Home Team</StyledTableCell>
                          <StyledTableCell align="center">Away Team</StyledTableCell>
                          <StyledTableCell align="center">Goals</StyledTableCell>
                          <StyledTableCell align="center">Assists</StyledTableCell>
                          <StyledTableCell align="center">Yellow Card</StyledTableCell>
                          <StyledTableCell align="center">Red Card</StyledTableCell>
                          <StyledTableCell align="center">Fouls</StyledTableCell>
                          <StyledTableCell align="center">Shots On Target</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredMatches.map((match) => (
                          <StyledTableRow
                            key={match.id}
                            onClick={() => openPopup(match)}
                            style={{ cursor: 'pointer' }}
                            sx={{ '&:hover': {backgroundColor: '#cae2fc'}}}
                          >
                            <StyledTableCell align="center">{match.id}</StyledTableCell>
                            <StyledTableCell align="center">{match.homeTeam.name}</StyledTableCell>
                            <StyledTableCell align="center">{match.awayTeam.name}</StyledTableCell>
                            <StyledTableCell align="center">{match.result?.homeTeamScore}</StyledTableCell>
                            <StyledTableCell align="center">{match.result?.assists}</StyledTableCell>
                            <StyledTableCell align="center">{match.result?.yellowCard}</StyledTableCell>
                            <StyledTableCell align="center">{match.result?.redCard}</StyledTableCell>
                            <StyledTableCell align="center">{match.result?.fouls}</StyledTableCell>
                            <StyledTableCell align="center">{match.result?.shotsOnTarget}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button variant="contained" sx={{marginTop: '20px'}} onClick={() => { openNewUser() }}>Add Report</Button>
                </div>
              </div>
            </div>
          </main>
    
          <footer>
            <AdminFooter />
          </footer>
    
          <Dialog open={isPopupOpen} onClose={closePopup} sx={{ textAlign: 'center' }}>
            <DialogTitle>Match Details</DialogTitle>
            <DialogContent sx={{ width: '600px' }}>
              {selectedMatch && (
                <div>
                  <h2>{selectedMatch.homeTeam.name} VS {selectedMatch.awayTeam.name}</h2>
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Goals', 'Assists', 'Yellow cards', 'Red cards', 'Fouls', 'Shots on target'] }]}
                    series={[{ data: [selectedMatch.result.homeTeamScore, selectedMatch.result.assists, selectedMatch.result.yellowCard, selectedMatch.result.redCard, selectedMatch.result.fouls, selectedMatch.result.shotsOnTarget] }]}
                    width={600}
                    height={400}
                    barLabel="value"
                  />
                </div>
              )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button onClick={closePopup}>Close</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={isUserDialogOpen} onClose={closeNewUser}>
                <DialogTitle sx={{textAlign: 'center'}}>Add New Report</DialogTitle>
                <DialogContent sx={{ minWidth: '300px' }}>
                    <div className="flex flex-col gap-5 items-center justify-center pt-3 mx-10">
                        <TextField id="outlined-basic" label="Home Team" variant="outlined" sx={{width: '100%'}}/>
                        <TextField id="outlined-basic" label="Away Team" variant="outlined" sx={{width: '100%'}}/>
                        <TextField id="outlined-basic" label="Goals" variant="outlined" sx={{width: '100%'}}/>
                        <TextField id="outlined-basic" label="Assists" variant="outlined" sx={{width: '100%'}}/>
                        <TextField id="outlined-basic" label="Yellow Crads" variant="outlined" sx={{width: '100%'}}/>
                        <TextField id="outlined-basic" label="Red Cards" variant="outlined" sx={{width: '100%'}}/>
                        <TextField id="outlined-basic" label="Fouls" variant="outlined" sx={{width: '100%'}}/>
                        <TextField id="outlined-basic" label="Shots On Target" variant="outlined" sx={{width: '100%'}}/>
                    </div>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', marginBottom: '10px' }}>
                    <Button variant="contained">Add New Report</Button>
                    <Button onClick={closeNewUser} variant="outlined">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
      );
    };
    
    export default Reports;