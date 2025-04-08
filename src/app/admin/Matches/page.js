'use client';
import { useState, useEffect } from 'react';
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
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

const Matches = () => {
    const [teams, setTeams] = useState([]);
    const [referees, setReferees] = useState([]);
    const [fields, setFields] = useState([]);
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddMatchDialogOpen, setIsAddMatchDialogOpen] = useState(false);
    const [isMatchDialogOpen, setIsMatchDialogOpen] = useState(false);
    const [newMatch, setNewMatch] = useState({
        homeTeam: '',
        awayTeam: '',
        date: null,
        time: '',
        referee: '',
        venue: ''
    });
    
    

    const filteredMatches = matches.filter((match) =>
        match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.referee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.date.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teamsRes, refereesRes, fieldsRes, matchesRes] = await Promise.all([
                    fetch('/api/auth/admin/teams/getTeams'),
                    fetch('/api/auth/admin/matches/getReferees'),
                    fetch('/api/auth/admin/matches/getFields'),
                    fetch('/api/auth/admin/matches/getMatches')
                ]);

                const [teamsData, refereesData, fieldsData, matchesData] = await Promise.all([
                    teamsRes.json(),
                    refereesRes.json(),
                    fieldsRes.json(),
                    matchesRes.json()
                ]);

                setTeams(teamsData);
                setReferees(refereesData);
                setFields(fieldsData);
                setMatches(matchesData.matches.map(match => ({
                    id: match.id,
                    homeTeam: teamsData.find(t => t.id === match.homeTeamId)?.name || 'Unknown',
                    awayTeam: teamsData.find(t => t.id === match.awayTeamId)?.name || 'Unknown',
                    date: match.date || 'Unknown',
                    referee: match.referee?.name || 'Unknown',
                    venue: match.field?.location || 'Unknown',
                })));



            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    
    const handleAddMatchSubmit = async () => {
        const field = fields.find(field => field.location === newMatch.venue);
        const referee = referees.find(ref => ref.name === newMatch.referee);
    
        if (!field || !referee) {
            alert("Please ensure all fields are correctly selected.");
            return;
        }
    
        // Combine the selected date and time into a single dateTime value
        const matchDateTime = new Date(newMatch.date);
        const timeParts = newMatch.time.split(":");
        matchDateTime.setHours(timeParts[0], timeParts[1]);
    
        const matchData = {
            homeTeamId: teams.find(team => team.name === newMatch.homeTeam).id,
            awayTeamId: teams.find(team => team.name === newMatch.awayTeam).id,
            dateTime: matchDateTime.toISOString(), // Store dateTime as ISO string
            fieldId: field.id,
            refereeId: referee.id,
        };
    
        try {
            const response = await fetch('/api/auth/admin/matches/addMatches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(matchData),
            });
    
            if (response.ok) {
                const addedMatch = await response.json();
                const newMatchFormatted = {
                    id: addedMatch.id,
                    homeTeam: newMatch.homeTeam,
                    awayTeam: newMatch.awayTeam,
                    date: newMatch.date.toLocaleDateString(),
                    time: newMatch.time, // Include the time in the table
                    referee: newMatch.referee,
                    venue: newMatch.venue
                };
                setMatches(prev => [...prev, newMatchFormatted]);
                setIsAddMatchDialogOpen(false);
                setNewMatch({ homeTeam: '', awayTeam: '', date: null, time: '', referee: '', venue: '' });
            } else {
                throw new Error('Failed to add match');
            }
        } catch (error) {
            console.error('Error adding match:', error);
        }
    };
    

    const handleDeleteMatch = async (matchId) => {
        try {
            const response = await fetch('/api/auth/admin/matches/deleteMatches', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ matchId }),
            });

            if (response.ok) {
                setMatches(prev => prev.filter(match => match.id !== matchId));
                setIsMatchDialogOpen(false);
                setSelectedMatch(null);
            } else {
                throw new Error('Failed to delete match');
            }
        } catch (error) {
            console.error('Error deleting match:', error);
        }
    };

    const handleInputChange = (field, value) => {
        setNewMatch(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div>
            <header>
                <AdminNav />
            </header>

            <main className="grid w-full grid-cols-[260px_auto] bg-gray-100 h-screen">
                <AdminSideBar className="col-start-1 col-end-2" />

                <div className="col-start-2 col-end-3 flex justify-center text-center">
                    <div className="pt-5">
                        <h1 className="text-3xl pb-3 pl-2 flex justify-left">
                            <strong>Matches</strong>
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

                        <TableContainer
                            component={Paper}
                            style={{ maxHeight: "500px", overflowY: "auto" }}
                        >
                            <Table stickyHeader sx={{ minWidth: 800 }} aria-label="matches table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>ID</StyledTableCell>
                                        <StyledTableCell>Home Team</StyledTableCell>
                                        <StyledTableCell>Away Team</StyledTableCell>
                                        <StyledTableCell>Date</StyledTableCell>
                                        <StyledTableCell>Time</StyledTableCell>
                                        <StyledTableCell>Referee</StyledTableCell>
                                        <StyledTableCell>Venue</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredMatches.map((match) => (
                                        <StyledTableRow
                                            key={match.id}
                                            sx={{ '&:hover': { backgroundColor: '#cae2fc' } }}
                                            onClick={() => {
                                                setSelectedMatch(match);
                                                setIsMatchDialogOpen(true);
                                            }}
                                        >
                                            <StyledTableCell>{match.id}</StyledTableCell>
                                            <StyledTableCell>{match.homeTeam}</StyledTableCell>
                                            <StyledTableCell>{match.awayTeam}</StyledTableCell>
                                            <StyledTableCell>{new Date(match.date).toLocaleDateString()}</StyledTableCell>
                                            <StyledTableCell>{new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</StyledTableCell>
                                            <StyledTableCell>{match.referee}</StyledTableCell>
                                            <StyledTableCell>{match.venue}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsAddMatchDialogOpen(true)}
                            sx={{ marginTop: "15px" }}
                        >
                            Add Match
                        </Button>
                    </div>
                </div>
            </main>

            <footer>
                <AdminFooter />
            </footer>

            <Dialog
                open={isAddMatchDialogOpen}
                onClose={() => setIsAddMatchDialogOpen(false)}
            >
                <DialogTitle>Schedule New Match</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        margin="dense"
                        label="Home Team"
                        fullWidth
                        variant="outlined"
                        value={newMatch.homeTeam}
                        onChange={(e) => handleInputChange('homeTeam', e.target.value)}
                    >
                        {teams.map(team => (
                            <MenuItem key={team.id} value={team.name}>{team.name}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        label="Away Team"
                        fullWidth
                        variant="outlined"
                        value={newMatch.awayTeam}
                        onChange={(e) => handleInputChange('awayTeam', e.target.value)}
                    >
                        {teams.map(team => (
                            <MenuItem key={team.id} value={team.name}>{team.name}</MenuItem>
                        ))}
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={newMatch.date}
                            onChange={(date) => handleInputChange('date', date)}
                            renderInput={(params) => (
                                <TextField {...params} margin="dense" fullWidth variant="outlined" />
                            )}
                        />
                    </LocalizationProvider>
                    <TextField
    margin="dense"
    label="Time"
    type="time"
    fullWidth
    variant="outlined"
    value={newMatch.time}
    onChange={(e) => handleInputChange('time', e.target.value)}
/>
                    <TextField
                        select
                        margin="dense"
                        label="Referee"
                        fullWidth
                        variant="outlined"
                        value={newMatch.referee}
                        onChange={(e) => handleInputChange('referee', e.target.value)}
                    >
                        {referees.map(ref => (
                            <MenuItem key={ref.id} value={ref.name}>{ref.name}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        label="Venue"
                        fullWidth
                        variant="outlined"
                        value={newMatch.venue}
                        onChange={(e) => handleInputChange('venue', e.target.value)}
                    >
                        {fields.map(field => (
                            <MenuItem key={field.id} value={field.location}>{field.location}</MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddMatchDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddMatchSubmit} color="primary">Schedule Match</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={isMatchDialogOpen}
                onClose={() => setIsMatchDialogOpen(false)}
            >
                <DialogTitle>Match Details</DialogTitle>
                <DialogContent>
                    {selectedMatch && (
                        <div>
                            <p><strong>ID:</strong> {selectedMatch.id}</p>
                            <p><strong>Home Team:</strong> {selectedMatch.homeTeam}</p>
                            <p><strong>Away Team:</strong> {selectedMatch.awayTeam}</p>
                            <p><strong>Date:</strong> {new Date(selectedMatch.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {new Date(selectedMatch.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p><strong>Referee:</strong> {selectedMatch.referee}</p>
                            <p><strong>Venue:</strong> {selectedMatch.venue}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsMatchDialogOpen(false)}>Close</Button>
                    <Button
                        onClick={() => handleDeleteMatch(selectedMatch?.id)}
                        color="error"
                        variant="contained"
                    >
                        Delete Match
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Matches;