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
  import Select from '@mui/material/Select';
  import MenuItem from '@mui/material/MenuItem';



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

  const Reports = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);
    const [newReport, setNewReport] = useState({
      homeTeamId: '',
      awayTeamId: '',
      homeTeamScore: '',
      assists: '',
      yellowCard: '',
      redCard: '',
      fouls: '',
      shotsOnTarget: ''
    });


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
      match?.homeTeam?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false
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
      const fetchTeams = async () => {
        try {
          const response = await fetch('/api/auth/admin/teams/getTeams');
          const data = await response.json();
          setTeams(data);
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      };

      const fetchMatches = async () => {
        try {
          const response = await fetch('/api/auth/admin/reports/getReports');
          const data = await response.json();
          setMatches(data);
        } catch (error) {
          console.error('Error fetching matches:', error);
        }
      };

      fetchTeams();
      fetchMatches();
    }, []);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewReport(prev => ({ ...prev, [name]: value }));
    };

    const handleAddReport = async () => {
      try {
        const response = await fetch('/api/auth/admin/reports/addReports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...newReport,
            homeTeamScore: parseInt(newReport.homeTeamScore) || 0,
            assists: parseInt(newReport.assists) || 0,
            yellowCard: parseInt(newReport.yellowCard) || 0,
            redCard: parseInt(newReport.redCard) || 0,
            fouls: parseInt(newReport.fouls) || 0,
            shotsOnTarget: parseInt(newReport.shotsOnTarget) || 0,
          })
        });

        if (response.ok) {
          const newMatch = await response.json();
          setMatches(prev => [...prev, newMatch]);
          closeNewUser();
          setNewReport({
            homeTeamId: '',
            awayTeamId: '',
            homeTeamScore: '',
            assists: '',
            yellowCard: '',
            redCard: '',
            fouls: '',
            shotsOnTarget: ''
          });
        }
      } catch (error) {
        console.error('Error adding report:', error);
      }
    };


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
                          sx={{ '&:hover': { backgroundColor: '#cae2fc' } }}
                        >
                          <StyledTableCell align="center">{match.id}</StyledTableCell>
                          <StyledTableCell align="center">{match.homeTeam.name}</StyledTableCell>
                          <StyledTableCell align="center">{match.awayTeam.name}</StyledTableCell>
                          <StyledTableCell align="center">{match.result?.homeTeamScore || "unknown"}</StyledTableCell>
                          <StyledTableCell align="center">{match.result?.assists || "unknown"}</StyledTableCell>
                          <StyledTableCell align="center">{match.result?.yellowCard || "unknown"}</StyledTableCell>
                          <StyledTableCell align="center">{match.result?.redCard || "unknown"}</StyledTableCell>
                          <StyledTableCell align="center">{match.result?.fouls || "unknown"}</StyledTableCell>
                          <StyledTableCell align="center">{match.result?.shotsOnTarget || "unknown"}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button variant="contained" sx={{ marginTop: '20px' }} onClick={() => { openNewUser() }}>Add Report</Button>
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
                  series={[{
                    data: [
                      selectedMatch.result?.homeTeamScore ?? 0,
                      selectedMatch.result?.assists ?? 0,
                      selectedMatch.result?.yellowCard ?? 0,
                      selectedMatch.result?.redCard ?? 0,
                      selectedMatch.result?.fouls ?? 0,
                      selectedMatch.result?.shotsOnTarget ?? 0
                    ]
                  }]}
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
          <DialogTitle sx={{ textAlign: 'center' }}>Add New Report</DialogTitle>
          <DialogContent sx={{ minWidth: '300px' }}>
            <div className="flex flex-col gap-5 items-center justify-center pt-3 mx-10">
              <Select
                name="homeTeamId"
                value={newReport.homeTeamId}
                onChange={handleInputChange}
                displayEmpty
                sx={{ width: '100%' }}
              >
                <MenuItem value="" disabled>Select Home Team</MenuItem>
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>

              <Select
                name="awayTeamId"
                value={newReport.awayTeamId}
                onChange={handleInputChange}
                displayEmpty
                sx={{ width: '100%' }}
              >
                <MenuItem value="" disabled>Select Away Team</MenuItem>
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                name="homeTeamScore"
                label="Home Team Goals"
                variant="outlined"
                sx={{ width: '100%' }}
                value={newReport.homeTeamScore}
                onChange={handleInputChange}
                type="number"
              />
              <TextField
                name="assists"
                label="Assists"
                variant="outlined"
                sx={{ width: '100%' }}
                value={newReport.assists}
                onChange={handleInputChange}
                type="number"
              />
              <TextField
                name="yellowCard"
                label="Yellow Cards"
                variant="outlined"
                sx={{ width: '100%' }}
                value={newReport.yellowCard}
                onChange={handleInputChange}
                type="number"
              />
              <TextField
                name="redCard"
                label="Red Cards"
                variant="outlined"
                sx={{ width: '100%' }}
                value={newReport.redCard}
                onChange={handleInputChange}
                type="number"
              />
              <TextField
                name="fouls"
                label="Fouls"
                variant="outlined"
                sx={{ width: '100%' }}
                value={newReport.fouls}
                onChange={handleInputChange}
                type="number"
              />
              <TextField
                name="shotsOnTarget"
                label="Shots On Target"
                variant="outlined"
                sx={{ width: '100%' }}
                value={newReport.shotsOnTarget}
                onChange={handleInputChange}
                type="number"
              />
            </div>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', marginBottom: '10px' }}>
            <Button variant="contained" onClick={handleAddReport}>Add New Report</Button>
            <Button onClick={closeNewUser} variant="outlined">Close</Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  };

  export default Reports;