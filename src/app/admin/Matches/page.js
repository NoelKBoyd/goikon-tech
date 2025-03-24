'use client';
import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";
import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

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
        width: '21ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  }));

function createData(homeTeam, awwayTeam, date, referee, venue) {
    return { homeTeam, awwayTeam, date, referee, venue };
}

const matchData = [
    createData('Manchester United', 'Liverpool', '28-03-2025', 'John Doe', 'Old Trafford'),
    createData('Chelsea', 'Arsenal', '29-03-2025', 'Jane Smith', 'Stamford Bridge'),
    createData('Manchester City', 'Tottenham Hotspur', '30-03-2025', 'Michael Brown', 'Etihad Stadium'),
    createData('Leicester City', 'Everton', '31-03-2025', 'Emily Davis', 'King Power Stadium'),
    createData('West Ham United', 'Aston Villa', '01-04-2025', 'Chris Wilson', 'London Stadium'),
    createData('Newcastle United', 'Brighton & Hove Albion', '02-04-2025', 'Sarah Johnson', 'St James\' Park'),
    createData('Crystal Palace', 'Wolverhampton Wanderers', '03-04-2025', 'David Lee', 'Selhurst Park'),
    createData('Leeds United', 'Southampton', '04-04-2025', 'Laura Martinez', 'Elland Road'),
    createData('Burnley', 'Sheffield United', '05-04-2025', 'James Anderson', 'Turf Moor'),
    createData('Nottingham Forest', 'Fulham', '06-04-2025', 'Sophia Taylor', 'City Ground'),
    createData('Brentford', 'Norwich City', '07-04-2025', 'Oliver Green', 'Gtech Community Stadium'),
    createData('Watford', 'Bournemouth', '08-04-2025', 'Emma White', 'Vicarage Road'),
    createData('Swansea City', 'Cardiff City', '09-04-2025', 'Liam Brown', 'Liberty Stadium'),
    createData('Derby County', 'Middlesbrough', '10-04-2025', 'Sophia Wilson', 'Pride Park Stadium'),
    createData('Reading', 'Huddersfield Town', '11-04-2025', 'Noah Taylor', 'Madejski Stadium'),
    createData('Blackburn Rovers', 'Preston North End', '12-04-2025', 'Isabella Moore', 'Ewood Park'),
    createData('Stoke City', 'Sunderland', '13-04-2025', 'Mason Clark', 'Bet365 Stadium'),
    createData('Hull City', 'Rotherham United', '14-04-2025', 'Charlotte Hall', 'MKM Stadium'),
    createData('Coventry City', 'Bristol City', '15-04-2025', 'James Adams', 'Coventry Building Society Arena'),
];

const Matches = () => {
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const searchMatches = matchData.filter((match) =>
        `${match.homeTeam} ${match.awwayTeam} ${match.date} ${match.referee}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openPopup = (match) => {
        setSelectedMatch(match);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setSelectedMatch(null);
        setPopupOpen(false);
    };

    const renderRow = (props) => {
        const { index, style } = props;
        const match = searchMatches[index];
    
        const backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#dedede';
    
        return (
            <ListItem style={{ ...style, backgroundColor, borderRadius: '8px'}} key={index} component="div" disablePadding>
                <ListItemButton sx={{'&:hover': {backgroundColor: '#d0d0d0'}, textAlign: 'center', borderRadius: '8px'}} onClick={() => openPopup(match)}>
                    <ListItemText primary={`${match.homeTeam} || VS || ${match.awwayTeam}`} secondary={`Date: ${match.date}, Referee: ${match.referee}`}/>
                </ListItemButton>
            </ListItem>
        );
    };

    return (
        <div>
            <header>
                <AdminNav />
            </header>

            <main className="grid w-full grid-cols-[260px_auto] bg-gray-100 h-full">
                <AdminSideBar className="col-start-1 col-end-2" />

                <div className="col-start-2 col-end-3 flex justify-center text-center">
                    <div className="pt-10">
                        <div>
                            <h1 className="text-3xl pb-3 pl-2 flex justify-left">
                                <strong>Match Timetable</strong>
                            </h1>

                            <div className="flex justify-left w-full">
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

                            <Box sx={{width: '100%', height: 500, maxWidth: 600, bgcolor: 'gray-100', borderRadius: '8px',}}>
                                <FixedSizeList height={500} width={600} itemSize={70} itemCount={searchMatches.length} overscanCount={10}>
                                    {renderRow}
                                </FixedSizeList>
                            </Box>
                        </div>
                        <div className="pt-10 mb-30">
                            <h1 className="text-3xl pb-3 pl-2 flex justify-left">
                                <strong>Schedule Matches</strong>
                            </h1>
                            <Box sx={{width: '100%', height: 400, maxWidth: 600, bgcolor: 'background.paper', borderRadius: '8px',}}>
                                <div className="pt-10">
                                    <TextField id="outlined-basic" label="Home Team" variant="outlined" color="success" focused sx={{paddingRight: '20px'}}/>
                                    <TextField id="outlined-basic" label="Away Team" variant="outlined" color="warning" focused/>
                                </div>
                                <div className="pt-10">
                                    <TextField id="outlined-basic" label="Date" variant="outlined" sx={{paddingRight: '20px'}}/>
                                    <TextField id="outlined-basic" label="Referee" variant="outlined"/>
                                </div>
                                <div className="pt-10">
                                    <TextField id="outlined-basic" label="Venue" variant="outlined" sx={{paddingRight: '20px'}}/>
                                </div>
                                <div className="pt-10">
                                    <Button variant="contained" color="primary">Schedule</Button>
                                </div>
                            </Box>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <AdminFooter />
            </footer>

            <Dialog open={isPopupOpen} onClose={closePopup} sx={{ textAlign: 'center'}}>
                <DialogTitle>Match Details</DialogTitle>
                <DialogContent sx={{ minWidth: '300px' }}>
                    {selectedMatch && (
                        <div>
                            <p>
                                <strong>Home Team:</strong> {selectedMatch.homeTeam}
                            </p>
                            <p>
                                <strong>Away Team:</strong> {selectedMatch.awwayTeam}
                            </p>
                            <p>
                                <strong>Date:</strong> {selectedMatch.date}
                            </p>
                            <p>
                                <strong>Referee:</strong> {selectedMatch.referee}
                            </p>
                            <p>
                                <strong>Venue:</strong> {selectedMatch.venue}
                            </p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button>Edit</Button>
                    <Button onClick={closePopup}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Matches;